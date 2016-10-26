import { join, dirname } from 'path';
import JsonGlob from './JsonGlob.js';

/**
 * Finds and attaches plugins to the provided Hapi server.
 * Searches all the files found by the given patterns for a
 * `ubc-farm.server-plugin` property and requires the file listed there.
 * @param {string[]} patterns in glob format
 * @param {Hapi.Server} server to register plugin to
 * @returns {Promise<void>} resolves once plugins have registered.
 */
export default async function importPlugins(patterns, server) {
	if (!server) throw new TypeError('Missing Hapi server');
	if (!Array.isArray(patterns)) throw new TypeError('patterns must be string[]');

	const globOptions = {
		symlinks: {},
		statCache: {},
		realpathCache: {},
		cache: {},
		nodir: true,
		nosort: true,
		absolute: true,
	};

	const plugins = [];
	const globsDone = Promise.all(patterns.map((pattern) => {
		const opts = Object.assign({}, globOptions, {
			pattern: patterns.filter(v => v !== pattern),
			keypath: 'ubc-farm.server-plugin',
		});

		const globber = new JsonGlob(pattern, opts).on('result', (str, match) => {
			const isString = typeof match === 'string';
			const pluginPath = join(dirname(isString ? match : match.register), str);
			const register = require(pluginPath);

			const plugin = isString
				? server.register(register, { once: true })
				: server.register(Object.assign({ once: true }, match, { register }));
			plugins.push(plugin);
		});

		return globber.done();
	}));

	return globsDone.then(() => Promise.all(plugins));
}
