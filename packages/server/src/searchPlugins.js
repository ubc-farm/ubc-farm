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
 * @returns {Promise}
 */
export default function searchPlugins(server, patterns) {
	if (!Array.isArray(patterns) || patterns.length === 0) {
		return importPlugin(server);
	}

	const dirPatterns = patterns.map(forceDirectory);

	return Promise.all([server, globAll(dirPatterns)])
		.then(([_server, folders]) => folders.map(folder => importPlugin(_server, folder)));
}
