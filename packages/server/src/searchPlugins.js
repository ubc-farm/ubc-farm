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
 * @returns {Promise<Map<string, Error>>} all errored plugins are returned as a
 * Map with the folder name as the key, and rejected error as the value.
 */
export default async function searchPlugins(serverPromise, patterns) {
	if (!Array.isArray(patterns) || patterns.length === 0) {
		const server = await Promise.resolve(serverPromise);
		try {
			await importPlugin(server);
			return server;
		} catch (err) {
			return new Map().set(process.cwd(), err);
		}
	}

	const dirPatterns = patterns.map(forceDirectory);
	const [server, folders] = await Promise.all([serverPromise, globAll(dirPatterns)]);

	const fails = new Map();
	await Promise.all(folders.map(async folder => {
		try {
			return await importPlugin(server, folder);
		} catch (err) {
			fails.set(folder, err);
			return undefined;
		}
	}));
	return fails;
}
