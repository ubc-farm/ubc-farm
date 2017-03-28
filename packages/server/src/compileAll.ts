import { resolve } from 'path';
import { FSWatcher } from 'fs';
import compileViews from './compileViews';
import listPagePackages from './listPagePackages';

interface CompileOptions {
	viewFolder?: (packageName: string) => Promise<string> | string,
	watch?: boolean,
}

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
function compileAll(options?: CompileOptions & { watch: true }): Promise<FSWatcher[]>
function compileAll(options?: CompileOptions): Promise<void>
async function compileAll(options?: CompileOptions): Promise<any> {
	const { viewFolder = () => '../views', watch = false } = options || {};

	const packages = await listPagePackages();
	packages.set('@ubc-farm/server', resolve(__dirname, '../views'));

	return Promise.all(
		Array.from(packages, async ([packageName, wwwPath]) => {
			let viewPath = await Promise.resolve(viewFolder(packageName));
			viewPath = resolve(wwwPath, viewPath);

			return compileViews({ from: viewPath, to: wwwPath, watch });
		})
	);
}

export default compileAll;
