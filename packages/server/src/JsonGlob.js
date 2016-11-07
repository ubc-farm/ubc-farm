import { readFile as readFileCb } from 'fs';
import { Glob } from 'glob';

export function promisify(func) {
	return (...args) => new Promise((resolve, reject) => {
		func(...args, (err, result) => (err ? reject(err) : resolve(result)));
	});
}
const readFile = promisify(readFileCb);

/**
 * Glob function with emitter for reading JSON files.
 * If a package.json file is found, require() will be used to access the cache.
 * Otherwise, the async readFile will be used.
 * @emits JsonGlob#result
 */
export default class JsonGlob extends Glob {
	/**
	 * @param {string} pattern passed to glob
	 * @param {Object} [options] shared between this and glob
	 * @param {string} [options.keypath] if set, returns this key's value
	 * from the JSON files found rather than the entire object.
	 */
	constructor(pattern, options = {}) {
		super(pattern, options);

		const { keypath } = options;
		if (typeof keypath !== 'string') {
			throw new TypeError('keypath must be a string');
		}
		const keys = keypath.split('.');

		const seen = new Set();

		this.on('match', async (match) => {
			try {
				if (seen.has(match)) return;
				seen.add(match);

				let json;
				if (match.endsWith('package.json')) json = require(match);
				else json = JSON.parse(await readFile(match));

				let subvalue = json;
				if (keypath) {
					try {
						subvalue = keys.reduce((parent, key) => parent[key], json);
					} catch (err) {
						if (!(err instanceof TypeError)) throw err;
						throw new TypeError(`Can't find ${keypath} in ${match}`);
					}
				}

				/**
				 * Result event
				 * @event JsonGlob#result
				 * @type {any}
				 */
				this.emit('result', subvalue, match);
			} catch (err) {
				this.emit('error', err);
			}
		});
	}

	/**
	 * @returns {Promise<string[]>} resolves once Glob emits end event,
	 * rejects if an error event is emited.
	 */
	done() {
		return new Promise(
			(resolve, reject) => this.once('end', resolve).once('error', reject)
		);
	}
}
