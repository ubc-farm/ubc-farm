/**
 * Acts like Object.assign, but for Map objects instead.
 * @param {Map} target
 * @param {...Iterable<K, V>} sources
 * @returns {Map} target
 */
export default function setAll(target, ...sources) {
	if (!(target instanceof Map)) {
		throw new TypeError('target must be a Map object');
	}

	for (const source of sources) {
		if (typeof source[Symbol.iterator] === 'function') {
			for (const [key, value] of source) target.set(key, value);
		} else if (typeof source === 'object' && source != null) {
			Object.keys(source).forEach(key => target.set(key, source[key]));
		}
	}

	return target;
}
