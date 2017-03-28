import * as resolveCallback from 'resolve';
import * as denodeify from 'denodeify';
import { resolve as resolvePath, join, dirname } from 'path';
import parseData from './utils/parseData';

const resolve = denodeify(resolveCallback);

interface PackageJSON {
	name: string
	www?: string
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
 * Obtains a list of ubc-farm page packages, along with their absolute paths
 * in the filesystem.
 */
export default async function listPagePackages(): Promise<Map<string, string>> {
	const fullList = getAllPages();

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
