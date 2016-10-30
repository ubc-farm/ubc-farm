'use strict'; // eslint-disable-line

const objectEntries = require('object.entries/polyfill');

/**
 * @param {Object|Map} map - object whose entries are iterated, or
 * an object that has an entries() iterator
 * @return {string}
 */
module.exports = function eachEntry(map, options) {
	let result = '';

	let entriesIter;
	if (typeof map.entries() === 'function'
	&& typeof map.entries()[Symbol.iterator] === 'function') {
		entriesIter = map.entries();
	} else {
		entriesIter = objectEntries(map);
	}

	for (const [key, value] of entriesIter) {
		result += options.fn({ key, value });
	}

	return result;
};
