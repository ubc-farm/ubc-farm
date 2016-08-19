/**
 * Acts like Object.assign, but for Map objects instead.
 * @param {Map} target
 * @param {...Map} sources
 * @returns {Map} target
 */
export default function assign(target, ...sources) {
	if (!(target instanceof Map)) {
		throw new TypeError('target must be a Map object');
	}

	for (const source of sources) {
		if (source instanceof Map) {
			for (const [key, value] of source) target.set(key, value);
		} else if (source != null) {
			for (const key in source) {
				if (Object.prototype.hasOwnProperty.call(source, key)) {
					target.set(key, source[key]);
				}
			}
		}
	}
	return target;
}
