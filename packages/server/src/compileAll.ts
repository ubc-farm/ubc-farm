import { resolve } from 'path';
import { FSWatcher } from 'fs';
import compileViews from './compileViews';
import listPagePackages from './listPagePackages';

/**
 * Compiles files from every packages' view folder and optionally watches them.
 * Takes results from `listPagePackages` to pick paths to watch.
 * By default, the view folder is a sibling of the www folder named views.
 * This can be changed by altering the `viewFolder` option.
 * @param options object
 * @param options.viewFolder function to get the path to the view folder,
 * relative to the www folder.
 * @param options.watch - if true, returns an array of FSWatchers for each package.
 */
function compileAll(options: { watch: true }): Promise<FSWatcher[]>
function compileAll(options?: { watch?: boolean }): Promise<void>
async function compileAll(options?: { watch?: boolean }): Promise<any> {
	const { watch = false } = options || {};

	const packages = await listPagePackages();
	packages.push({
		name: '@ubc-farm/server', url: '',
		paths: {
			www: resolve(__dirname, '../www'),
			views: resolve(__dirname, '../views'),
		},
	})

	return Promise.all(
		packages.map(async pageData => compileViews({
			from: pageData.paths.views,
			to: pageData.paths.www,
			watch,
		}))
	);
}

export default compileAll;
