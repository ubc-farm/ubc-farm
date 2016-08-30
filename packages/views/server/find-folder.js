import { resolve as resolvePath, join } from 'path';
import { stat } from 'fs';

/**
 * Checks if the given path exists
 * @returns {Promise<boolean>}
 */
export function doesPathExist(path) {
	return new Promise((resolve, reject) => stat(path, err => {
		if (err) {
			if (err.code === 'ENOENT') resolve(false);
			else reject(err);
		}	else {
			resolve(true);
		}
	}));
}

/**
 * Tries to recursively find the given folder(s) by searching using fs.stat
 * @returns {Promise<string>} undefined if no path is ever found
 */
export default function search(folder, ...potentialNames) {
	if (folder === resolvePath('/')) {
		// throw new Error('Search failed, could not find ' +
		//	`any of ${potentialNames.join()}`);
		console.warn(`Could not find ${potentialNames.join(', ')}`);
		return undefined;
	}

	const potentialPaths = potentialNames.map(name => join(folder, name));

	const checkPaths = Promise.all(potentialPaths.map(p => doesPathExist(p)));

	return checkPaths.then(results => {
		const noneExist = results.every(v => !v);
		if (noneExist) {
			const upOnePath = resolvePath(folder, '../');
			return search(upOnePath, ...potentialNames);
		}

		const index = results.findIndex(v => v === true);
		const foundPath = potentialPaths[index];
		return foundPath;
	});
}
