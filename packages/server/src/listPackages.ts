import { stat as statCallback } from 'fs';
import { readdir } from './fs-awaitable'
import { resolve } from 'path';
import denodeify from 'denodeify';

const stat = denodeify(statCallback);

async function wwwExists(folder: string) {
	try {
		await stat(resolve(folder, 'www'));
		return true;
	} catch (err) {
		if (err.code === 'ENOENT') return false;
		throw err;
	}
}

async function defaultFilter(folder: string) {
	if (folder.startsWith('page-')) return false;
	return wwwExists(folder);
}

/**
 * Lists all page packages. The results can be filtered based on a custom
 * filtering function. By default, pages that start with "page-" are ignored.
 * Keys in the map are folder names, and values are the full path to the static
 * resource directory of that package.
 * @param filter
 */
export default async function listPackages(
	filter?: (name: string) => boolean | Promise<boolean>
): Promise<Map<string, string>> {
	const pagePackages = resolve(__dirname, '../../../pages');
	const filterer = filter || defaultFilter;

	const packages: string[] = await readdir(pagePackages);

	const filterResults = await Promise.all(packages.map(folder =>
		Promise.resolve(filterer(folder))
			.then(bool => [folder, bool])
	));

	return filterResults
		.reduce((map, [folder, bool]: [string, boolean]) => (
			bool
				? map.set(folder, resolve(pagePackages, folder, 'www'))
				: map
		), new Map<string, string>());
}
