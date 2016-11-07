import 'es7-object-polyfill';
import { join, dirname, sep, posix } from 'path';
import resolveCb from 'resolve';
import JsonGlob, { promisify } from './JsonGlob.js';

const resolve = promisify(resolveCb);
const keypath = 'ubc-farm.server-plugin';

/**
 * Finds and attaches plugins to the provided Hapi server.
 * Searches all the files found by the given patterns for a
 * `ubc-farm.server-plugin` property and requires the file listed there.
 * @param {string[]} patterns in glob format
 * @param {Hapi.Server} server to register plugin to
 * @returns {Promise<Object>} resolves once plugins have registered.
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
		keypath,
	};

	const plugins = [];
	await Promise.all(patterns.map(async (pattern) => {
		if (!pattern.includes(sep) && !pattern.includes(posix.sep)) {
			let pluginOpts;

			const pluginPath = await resolve(pattern, {
				basedir: process.cwd(),
				packageFilter(pkg, pkgfile) {
					let subvalue = pkg;
					try {
						subvalue = keypath.split('.')
							.reduce((parent, key) => parent[key], pkg);
					} catch (err) {
						if (!(err instanceof TypeError)) throw err;
						throw new TypeError(`Can't find ${keypath} in ${pkgfile}`);
					}

					pluginOpts = Object.assign({ once: true }, subvalue);
					return typeof subvalue === 'string' ? subvalue : subvalue.register;
				},
			});

			const register = require(pluginPath);
			pluginOpts.register = register;

			plugins.push(server.register(pluginOpts).then(() => pluginOpts));
		} else {
			const opts = Object.assign({}, globOptions, {
				pattern: patterns.filter(v => v !== pattern),
			});

			const globber = new JsonGlob(pattern, opts)
				.on('result', (obj, match) => {
					const isString = typeof obj === 'string';
					const pluginPath = join(dirname(match), isString ? obj : obj.register);

					const register = require(pluginPath);
					const plugin = Object.assign({ once: true }, obj, { register });

					plugins.push(server.register(plugin).then(() => plugin));
				});

			await globber.done();
		}
	}));

	const pluginInfo = {};
	for (const { register: { attributes }, route = '' } of await Promise.all(plugins)) {
		const name = attributes.name || (attributes.pkg && attributes.pkg.name);
		if (!name) throw new Error("Can't find a plugin name");

		pluginInfo[name] = route;
	}

	server.route({
		method: 'GET',
		path: '/services',
		handler: (req, reply) => reply(pluginInfo).type('application/json'),
		config: {
			response: {
				schema: (json, opts, next) => Promise.resolve().then(() => {
					if (typeof json !== 'object' || json === null) {
						throw new TypeError('Response is not an object');
					} else if (Object.values(json).some(url => url.endsWith('/'))) {
						throw new Error('Some values end in a slash (/)');
					}
				}).then(next, next),
			},
			cors: true,
		},
	});

	return pluginInfo;
}
