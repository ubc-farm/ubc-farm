import { resolve } from 'path';
import { FSWatcher } from 'fs';
import compileViews from './compileViews';
import listPagePackages from './listPagePackages';

/**
 * Runs `compileViews` in every packages' view folder and optionally watches them.
 * Takes results from `listPagePackages` to pick paths to watch.
 * @param options object
 * @param options.watch - if true, returns an array of FSWatchers for each package.
 */
function compileAll(options: { watch: true }): Promise<FSWatcher[]>
function compileAll(options?: { watch?: boolean }): Promise<void>
async function compileAll(options: { watch?: boolean } = {}): Promise<any> {
	const { watch = false } = options;

	const packages = await listPagePackages();
	// Add the @ubc-farm/server package to the list
	packages.push({
		name: '@ubc-farm/server', url: '',
		paths: {
			www: resolve(__dirname, '../www'),
			views: resolve(__dirname, '../views'),
		},
	})

	// Call `compileViews` for every package
	return Promise.all(
		packages.map(pageData => compileViews({
			from: pageData.paths.views,
			to: pageData.paths.www,
			watch,
		}))
	);
}

export default compileAll;
