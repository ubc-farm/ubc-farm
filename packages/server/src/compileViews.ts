import { watch, FSWatcher } from 'fs';
import { join, relative } from 'path';
import { writeFile } from './utils/fs-awaitable';
import walkFolder from './utils/walkFolder';
import prepareData from './utils/prepareData';
import compileFile from './utils/compileFile';
import listPagePackages, { PageData } from './listPagePackages'
import readData from './readData';

interface ViewOptions {
	from: string,
	to: string,
	watch?: boolean,
}

/**
 * Compiles the view files in the given folder and saves them in the given
 * output folder. Can be set to watch for futher changes.
 */
async function compileViews(
	options: { watch: true } & ViewOptions
): Promise<FSWatcher>
async function compileViews(
	options: ViewOptions
): Promise<void>
async function compileViews(
	options: ViewOptions
): Promise<FSWatcher | void> {
	const { from, to } = options;

	const results: any[] = await Promise.all([
		walkFolder(from, entryInfo => entryInfo.fullPath),
		readData(),
		listPagePackages(),
		prepareData(),
	]);
	const paths: string[] = results[0];
	const data: any = results[1];
	const pages: PageData[] = results[2];

	const context = { data: { ...data, pages } };

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
