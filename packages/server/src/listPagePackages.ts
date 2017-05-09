import { resolve as resolvePath, join, dirname } from 'path';
import { resolve } from './utils/denodeify';
import parseData from './utils/parseData';

interface PackageJSON {
	name: string
	www?: string
	'ubc-farm'?: {
		www?: string
		views?: string
		url?: string
	}
}

export interface PageData {
	name: string // name of the package
	url: string // URL where the package will be found in the server
	paths: {
		www: string // Path to the static files
		views: string // Path to the view files
	}
}

/**
 * Returns all possible page package names. The optional dependencies from this
 * module's package.json are used.
 */
function getAllPages(): string[] {
	const pkg = require(resolvePath(__dirname, '../package.json'));
	return Object.keys(pkg.optionalDependencies);
}

/**
 * Obtains a list of ubc-farm page packages, along with their absolute paths in
 * the filesystem. Each package.json must have a "ubc-farm" property to be detected.
 * Additional data can be specified in the "ubc-farm" object, but if unspecified
 * defaults will be used.
 */
export default async function listPagePackages(): Promise<PageData[]> {
	const fullList = getAllPages();

	// For each package, find the path to its package.json file.
	// Return an array where each item contains the contents of the package file,
	// as well as the path to the file.
	// If a package.json file isn't found for a package, null is used instead.
	const packageData = await Promise.all(fullList.map(async packageName => {
		try {
			const pkgPath: string = await resolve(`${packageName}/package.json`, {
				extensions: ['.json'],
				basedir: process.cwd(),
			});
			const pkg: PackageJSON = await parseData(pkgPath);
			return { packageJson: pkg, path: dirname(pkgPath) };
		} catch (err) {
			return null;
		}
	}));

	const dataList: PageData[] = [];
	for (const pkg of packageData) {
		if (pkg === null) continue; // Skip null items
		const { packageJson, path } = pkg;
		const { name, 'ubc-farm': farmData } = packageJson;

		if (farmData) {
			// All valid package files have a `name` property
			if (!name) throw new Error('package.json missing name property');
			const pageData = { name, url: '', paths: { www: '', views: '' } };

			// The URL where the page is located. The URL can be specified in
			// ubc-farm.url, but if not specified it is automatically generated
			// from the package name. The @ubc-farm prefix is stripped if present.
			if (farmData.url) pageData.url = farmData.url;
			else if (name.startsWith('@ubc-farm/'))
				pageData.url = name.slice('@ubc-farm'.length) + '/';
			else
				pageData.url = `/${name}/`;

			// The path to the `www` folder for the page, where static files are located.
			// If not manually set, it's assummed there is a `www` folder containing
			// the files.
			pageData.paths.www = farmData.www || 'www';
			pageData.paths.www = join(path, pageData.paths.www);

			// The path to the `views` folder for the page. Same convetions as `www`.
			pageData.paths.views = farmData.views || 'views';
			pageData.paths.views = join(path, pageData.paths.views);

			dataList.push(pageData);
		}
	}

	return dataList;
}
