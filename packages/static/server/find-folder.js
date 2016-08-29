import { resolve as resolvePath, join } from 'path';
import { stat as statNode } from 'fs';
import { promisify } from 'ubc-farm-utils';

const stat = promisify(statNode);

function doesPathExist(path) {
	return stat(path)
	.then(() => true)
	.catch(err => {
		if (err.code === 'ENOENT') return false;
		throw err;
	});
}

/**
 * Tries to recursively find the given folder(s) by searching using fs.stat
 * @returns {Promise<string>} undefined if no path is ever found
 */
export default function search(folder, ...potentialNames) {
	if (folder === resolvePath('/')) return Promise.resolve(undefined);

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
