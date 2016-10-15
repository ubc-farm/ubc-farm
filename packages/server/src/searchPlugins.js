import importPlugin from './importPlugin.js';
import globAll from './globAll.js';

/**
 * Forces a glob pattern to look for directories rather than files.
 * If a pattern ends with a `/`, then glob will only return folders.
 * @param {string} pattern passed to glob
 * @returns {string} pattern for folders
 */
function forceDirectory(pattern) {
	return pattern.endsWith('/') ? pattern : `${pattern}/`;
}

/**
 * @param {Hapi.Server|Promise<Hapi.Server>} server - can be
 * either a Hapi server or a promise that resolves with one
 * @param {string[]} patterns to search in glob format
 * @returns {Promise<Hapi.Server>}
 */
export default async function searchPlugins(serverPromise, patterns) {
	if (!Array.isArray(patterns) || patterns.length === 0) {
		const server = await Promise.resolve(serverPromise);
		await importPlugin(server);
		return server;
	}

	const dirPatterns = patterns.map(forceDirectory);
	const [server, folders] = await Promise.all([serverPromise, globAll(dirPatterns)]);
	await Promise.all(folders.map(folder => importPlugin(server, folder)));
	return server;
}
