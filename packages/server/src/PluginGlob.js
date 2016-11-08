import { readFile as readFileCB } from 'fs';
import { Glob } from 'glob';
import requirePlugin, { promisify } from './requirePlugin.js';

const readFile = promisify(readFileCB);

/**
 * Glob function with emitter for reading plugin files
 * @emits PluginGlob#result
 */
export default class PluginGlob extends Glob {
	/**
	 * @param {string} pattern passed to glob
	 * @param {Object} [options] shared between this and glob
	 */
	constructor(pattern, options = {}) {
		super(pattern, options);

		const seen = new Set();

		this.on('match', (match) => {
			if (seen.has(match)) return;
			seen.add(match);

			requirePlugin(match)
				.then(plugin => this.emit('result', plugin, match))
				.catch(err => this.emit('error', err));
		});
	}

	/**
	 * @returns {Promise<string[]>} resolves once Glob emits end event,
	 * rejects if an error event is emited.
	 */
	done() {
		return new Promise((resolve, reject) => this
			.once('end', resolve)
			.once('error', reject)
		);
	}
}
