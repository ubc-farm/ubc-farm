import { join } from 'path';
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
		const opts = Object.assign({}, globOptions);
		opts.pattern = patterns.filter(v => v !== pattern);

		const globber = new JsonGlob(pattern, opts).on('result', (str, match) =>
			plugins.push(server.register(join(match, str), { once: true }))
		);

		return globber.done();
	}));

	return globsDone.then(() => Promise.all(plugins));
}
