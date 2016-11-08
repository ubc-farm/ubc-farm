import { extname, join, relative, isAbsolute } from 'path';
import { readFile as readFileCB } from 'fs';
import resolveCB from 'resolve';

export function promisify(func) {
	return (...args) => new Promise((resolve, reject) => {
		func(...args, (err, result) => (err ? reject(err) : resolve(result)));
	});
}
const readFile = promisify(readFileCB);
const resolve = promisify(resolveCB);

/** Returns the key `ubc-farm.server-plugin` from the given json */
function getSubsetFrom(json) {
	try {
		return json['ubc-farm']['server-plugin'];
	} catch (err) {
		if (err instanceof TypeError) return null;
		throw err;
	}
}

/**
 * Requires a plugin based on the path provided.
 * If a JSON file, will read the JSON and look for the ubc-farm.server-plugin
 * key inside the JSON, and use that for loading.
 * If a JS file, will try to load that directly
 * If a directory, will try to find a package.json inside it and use that.
 * Module names are processed in the same way.
 * @param {string} path
 * @returns {Promise<Object>} resolves with plugin descriptor object
 */
export default async function requirePlugin(sourcePath, forceExt) {
	const absPath = isAbsolute(sourcePath)
		? sourcePath
		: join(process.cwd(), sourcePath);
	const relPath = relative(__dirname, absPath);

	switch (forceExt || extname(sourcePath)) {
		case '.js':
			return {
				once: true,
				register: require(relPath),
			};

		case '.json': {
			let config = sourcePath.endsWith('package.json')
				? require(relPath)
				: await readFile(absPath);
			config = getSubsetFrom(config);

			let pluginPath;
			switch (typeof config) {
				case 'string':
					pluginPath = config;
					// fall through
				case 'object':
					if (config === null) {
						throw new Error(
							`Couldn't find ubc-farm.server-plugin key in ${sourcePath}`
						);
					}

					pluginPath = pluginPath || config.register;
					break;
				default:
					throw new Error(`ubc-farm.server-plugin contains ${typeof pluginPath}`
						+ `, not a string or object in file ${sourcePath}`);
			}

			pluginPath = join(relPath, '../', pluginPath);

			return Object.assign(
				{ once: true },
				config,
				{ register: require(pluginPath) },
			);
		}

		case '': {
			let config;
			const pluginPath = await resolve(sourcePath, {
				basedir: process.cwd(),
				packageFilter(pkg, pkgfile) {
					config = getSubsetFrom(pkg);
					if (typeof config === 'string') {
						return config;
					} else if (typeof config === 'object' && config !== null) {
						return config.register;
					}

					throw new Error(`Invalid config in ${pkgfile}`);
				},
			});

			return Object.assign(
				{ once: true },
				config,
				{ register: require(pluginPath) },
			);
		}

		default:
			throw new TypeError(`${sourcePath} has invalid extension`);
	}
}
