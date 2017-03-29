import * as resolveCallback from 'resolve';
import * as denodeify from 'denodeify';
import { resolve as resolvePath, join, dirname } from 'path';
import parseData from './utils/parseData';

const resolve = denodeify(resolveCallback);

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
	name: string
	url: string
	paths: {
		www: string
		views: string
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
 * Obtains a list of ubc-farm page packages, along with their absolute paths
 * in the filesystem.
 */
export default async function listPagePackages(): Promise<PageData[]> {
	const fullList = getAllPages();

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
		if (pkg === null) continue;
		const { packageJson, path } = pkg;
		const { name, 'ubc-farm': farmData } = packageJson;

		if (farmData) {
			if (!name) throw new Error('package.json missing name property');
			const pageData = { name, url: '', paths: { www: '', views: '' } };

			if (farmData.url) pageData.url = farmData.url;
			else if (name.startsWith('@ubc-farm/'))
				pageData.url = name.slice('@ubc-farm/'.length - 1) + '/';
			else
				pageData.url = `/${name}/`

			pageData.paths.www = farmData.www || 'www';
			pageData.paths.www = join(path, pageData.paths.www);

			pageData.paths.views = farmData.views || 'views';
			pageData.paths.views = join(path, pageData.paths.views);

			dataList.push(pageData);
		}
	}

	return dataList;
}
