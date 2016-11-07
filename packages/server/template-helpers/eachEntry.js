'use strict';

var es7ObjectPolyfill = require('es7-object-polyfill');

/**
 * @param {Object|Map} map - object whose entries are iterated, or
 * an object that has an entries() iterator
 * @return {string}
 */
function eachEntry(map, options) {
	let result = '';

	let entriesIter;
	if (typeof map.entries() === 'function' && typeof map.entries()[Symbol.iterator] === 'function') {
		entriesIter = map.entries();
	} else {
		entriesIter = Object.entries(map);
	}

	for (const [key, value] of entriesIter) {
		result += options.fn({ key, value });
	}

	return result;
}

module.exports = eachEntry;
