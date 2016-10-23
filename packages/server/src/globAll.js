import globCb from 'glob';

export function promisify(func) {
	return (...args) => new Promise((resolve, reject) => {
		func(...args, (err, result) => (err ? reject(err) : resolve(result)));
	});
}

const glob = promisify(globCb);

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
export default async function globAll(patterns, options = {}) {
	const {
		ignore,
		symlinks = {},
		statCache = {},
		realpathCache = {},
		cache = {},
	} = options;

	if (!Array.isArray(patterns)) {
		throw new TypeError('pattern must be string[]');
	}

	function ignoreRest(currentItem) {
		const list = restOfArray(patterns, currentItem);
		return Object.assign({}, options, {
			ignore: ignore ? list.concat(ignore) : list,
			symlinks,
			statCache,
			realpathCache,
			cache,
		});
	}

	const results = await Promise.all(
		patterns.map(pattern =>	glob(pattern, ignoreRest(pattern)))
	);

	const noDuplicates = new Set();
	results.forEach((matches) => {
		if (matches) matches.forEach(match => noDuplicates.add(match));
	});
	return Array.from(noDuplicates);
}
