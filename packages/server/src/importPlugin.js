import { join, isAbsolute, dirname } from 'path';

/* eslint-disable global-require */

export class ConfigError extends Error {
	constructor(path) {
		super('No server-plugin path found, ' +
			`check ${path} for ubc-farm.server-plugin field`);
	}
}

/**
 * Finds and attaches a plugin to the provided Hapi server.
 * A package.json is search for in the given folder, and the path to the
 * plugin file is taken from that value. That path is relative to the
 * package.json location. Returned promise resolves once plugin has
 * been registered.
 * @param {Hapi.Server} server to register plugin to
 * @param {string} [folder] containg package.json - defaults to process.cwd()
 * @param {Object} [options] passed to server.register
 * @returns {Promise<void>} resolves once plugin has registered.
 */
export default async function importPlugin(server, folder = process.cwd(), options) {
	if (!server) throw new TypeError('Missing Hapi server');

	let path = join(folder, './package.json');
	if (!isAbsolute(path)) path = join(process.cwd(), path);

	const json = require(path);
	let pluginPath = json['ubc-farm'] && json['ubc-farm']['server-plugin'];
	if (!pluginPath) throw new ConfigError(path);
	pluginPath = join(dirname(path), pluginPath);

	const plugin = require(pluginPath);
	await server.register(plugin, Object.assign({ once: true }, options));
}