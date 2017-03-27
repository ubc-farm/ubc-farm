import 'es7-object-polyfill';
import PluginGlob from './PluginGlob.js';
import requirePlugin from './requirePlugin.js';

function isGlob(pattern) {
	return pattern.includes('*');
}

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
	};

	const plugins = [];
	await Promise.all(patterns.map(async (pattern) => {
		if (!isGlob(pattern)) {
			const plugin = await requirePlugin(pattern);
			plugins.push(server.register(plugin).then(() => plugin));
		} else {
			const opts = Object.assign({}, globOptions, {
				pattern: patterns.filter(v => v !== pattern),
			});

			await new PluginGlob(pattern, opts)
				.on('result', plugin => plugins.push(
					server.register(plugin).then(() => plugin)
				))
				.done();
		}
	}));

	const pluginInfo = {};
	const pluginList = await Promise.all(plugins);
	for (const { register: { attributes }, route = '' } of pluginList) {
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
