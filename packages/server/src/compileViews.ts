import { watch, FSWatcher } from 'fs';
import { resolve } from 'path';
import { writeFile } from './utils/fs-awaitable';
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

function copyFile(from: string, to: string, context: any): Promise<void> {
	return compileFile(from, context)
		.then(({ out, path }) => {
			const dest = resolve(to, path);
			return writeFile(dest, out, 'utf8');
		})
		.then(() => {})
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
): Promise<void> {
	const { from, to } = options;

	const results = await Promise.all([
		walkFolder(from, path => path),
		readData(),
		listPagePackages(),
		prepareData(),
	]);
	const paths: string[] = results[0];
	const data: any = results[1];
	const pages: Map<string, string> = results[2];

	const context = { data: { ...data, pages: [...pages.keys()] } };

	await Promise.all(paths.map(path => copyFile(path, to, context)));

	if (options.watch) {
		const watcher = watch(from, { recursive: true }, (event, filename) => {
			copyFile(resolve(from, filename), to, context);
		});
	}
}

export default compileViews;
