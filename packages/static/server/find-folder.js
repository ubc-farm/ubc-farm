import { resolve as resolvePath, join } from 'path';
import { stat as statNode } from 'fs';
import { promisify } from '../node_modules/ubc-farm-utils/index.js';

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

	const checkExists = Promise.all(potentialPaths.map(p => doesPathExist(p)));

	return checkExists.then(results => {
		if (results.every(v => v === false)) {
			const upOnePath = resolvePath(folder, '../');
			return search(upOnePath, ...potentialNames);
		} else {
			const index = results.findIndex(v => v === true);
			const foundPath = potentialPaths[index];
			return foundPath;
		}
	});
}
