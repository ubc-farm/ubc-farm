import { watch, FSWatcher } from 'fs';
import { join, relative } from 'path';
import { writeFile } from './utils/denodeify';
import walkFolder from './utils/walkFolder';
import prepareData from './utils/prepareData';
import compileFile from './utils/compileFile';
import listPagePackages from './listPagePackages'
import readData from './readData';

interface ViewOptions {
	from: string,
	to: string,
	watch?: boolean,
}

/**
 * Compiles the view files from the given folder and saves them to the given output
 * folder. Can be set to watch for futher changes. If watch is true, the files
 * in the from folder will be watched and recompiled when changes are made.
 * A FSWatcher object is returned.
 * If a folder starts with an underscore, it is ignored.
 */
async function compileViews(options: { watch: true } & ViewOptions): Promise<FSWatcher>
async function compileViews(options: ViewOptions): Promise<void>
async function compileViews(options: ViewOptions): Promise<FSWatcher | void> {
	const { from, to } = options;

	const [paths, data, pages] = await Promise.all([
		walkFolder(from, entryInfo => entryInfo.fullPath),
		readData(),
		listPagePackages(),
		prepareData(),
	]);

	const context = { data: { ...data, pages } };

	/**
	 * Copies a file from the specified source path.
	 * The output path is determined based on the
	 * file body and path (see utils/compileFile).
	 * Files starting with '_' are ignored.
	 */
	async function copyFile(fromFile: string): Promise<void> {
		const shouldIgnore = relative(from, fromFile).startsWith('_');
		if (shouldIgnore) return;

		const { out, path } = await compileFile(fromFile, from, context);

		const dest = join(to, path);
		await writeFile(dest, out, 'utf8');
	}

	await Promise.all(paths.map(copyFile));

	if (options.watch) {
		return watch(from, { recursive: true }, (event, filename: string) => {
			const path = join(from, filename);
			if (event === 'change') copyFile(path);
		});
	}
}

export default compileViews;
