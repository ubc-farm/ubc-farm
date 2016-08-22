import id from './id.js';

/**
 * Transforms an array of objects into a keyed map, using the specified
 * key property as the key used in the Map.
 * @param {Array<Object>} array
 * @param {string} [idKey]
 * @returns {Map<string, Object>}
 * @alias module:lib/utils.arrayToMap
 */
export function arrayToMap(array, idKey) {
	return array.reduce((map, obj) => (
		map.set(obj[idKey] || id(), obj)
	), new Map());
}

/**
 * Transforms an array of objects into a keyed object, using the specified
 * key property as the key used in the new object.
 * @param {Array<Object>} array
 * @param {string} [idKey]
 * @returns {Object}
 * @alias module:lib/utils.arrayToObjectMap
 */
export function arrayToObjectMap(array, idKey) {
	if (!Array.isArray(array)) {
		throw new TypeError('arrayToObjectMap was not given an array');
	}

	return array.reduce((newObj, obj) => {
		newObj[obj[idKey] || id()] = obj;
		return newObj;
	}, {});
}

/**
 * Transforms a map into an object. Non-string and non-number keys are ignored.
 * @param {Map} map
 * @returns {Object}
 * @alias module:lib/utils.mapToObject
 */
export function mapToObject(map) {
	const obj = {};

	for (const [key, value] of map) {
		if (typeof key === 'string') obj[key] = value;
	}

	return obj;
}
