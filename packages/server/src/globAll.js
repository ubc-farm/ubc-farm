import globCb from 'glob';

/** Promisified glob function */
function glob(pattern, options) {
	return new Promise((resolve, reject) => {
		globCb(pattern, options, (err, result) => {
			if (err) return reject(err);
			return resolve(result);
		});
	});
}

/**
 * @param {Array<V>} array
 * @param {V} removedItem
 * @returns {Array<V>} a copy of the array with the given item removed.
 */
function restOfArray(array, removedItem) {
	return array.filter(v => v !== removedItem);
}

/**
 * Same effects as glob, but takes an array of patterns
 * rather than a single pattern. Globs are executed in parallel.
 * Globs share a cache and are set to ignore the paths searched by
 * other globs.
 * @param {string[]} patterns
 * @param {Object} [options] passed to glob
 * @returns {Promise<string[]>} array of file paths found by glob
 */
export default function globAll(patterns, options = {}) {
	let symlinks;
	let statCache;
	let realpathCache;
	let cache;

	function addToIgnore(items) {
		return Object.assign({}, options, {
			ignore: options.ignore ? items.conat(options.ignore) : items,
			symlinks,
			statCache,
			realpathCache,
			cache,
		});
	}

	return Promise.all(patterns.map((pattern, i, array) =>
		glob(pattern, addToIgnore(restOfArray(array, pattern)))
	)).then(results => [].concat(...results));
}
