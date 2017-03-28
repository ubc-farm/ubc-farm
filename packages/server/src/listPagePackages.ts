import resolveCallback from 'resolve';
import denodeify from 'denodeify';
import { resolve as resolvePath, join, dirname } from 'path';
import { readdir } from './utils/fs-awaitable';
import parseData from './utils/parseData';

const resolve = denodeify(resolveCallback);

interface PackageJSON {
	name: string
	www?: string
}

/**
 * Returns all possible page package names. In production mode, a set
 * list of names is used. In development mode, the pages folder in the monorepo
 * is scanned and all of the packages from that is returned.
 */
async function getAllPages(): Promise<string[]> {
	if (process.env.NODE_ENV === 'production') {
		return [
			'@ubc-farm/calendar',
			'@ubc-farm/directory',
			'@ubc-farm/fields',
			'@ubc-farm/graphs',
			'@ubc-farm/invoice',
			'@ubc-farm/planner',
		]
	}

	const pageFolder = resolvePath(__dirname, '../../../pages');
	const packages: string[] = await readdir(pageFolder);

	const namesReady = packages.filter(name => !name.startsWith('page-'))
		.map(name => join(pageFolder, name, 'package.json'))
		.map(path => parseData(path).then((pkg: PackageJSON) =>  pkg.name))

	return Promise.all(namesReady);
}

/**
 * Obtains a list of ubc-farm page packages, along with their absolute paths
 * in the filesystem.
 */
export default async function listPagePackages(): Promise<Map<string, string>> {
	const fullList = await getAllPages();

	const results = await Promise.all(fullList.map(async packageName => {
		try {
			const pkgPath: string = await resolve(`${packageName}/package.json`, {
				extensions: ['.json'],
			});
			const pkg: PackageJSON = await parseData(pkgPath);
			return { package: pkg, path: dirname(pkgPath) };
		} catch (err) {
			return null;
		}
	}));

	return results.reduce((map, pkg) => {
		if (pkg !== null && pkg.package.www) {
			return map.set(pkg.package.name, join(pkg.path, pkg.package.www));
		}	else
			return map;
	}, new Map());
}
