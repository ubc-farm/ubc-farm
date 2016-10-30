'use strict';

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var index = createCommonjsModule(function (module) {
if (typeof Reflect === 'object' && typeof Reflect.ownKeys === 'function') {
  module.exports = Reflect.ownKeys;
} else if (typeof Object.getOwnPropertySymbols === 'function') {
  module.exports = function Reflect_ownKeys(o) {
    return (
      Object.getOwnPropertyNames(o).concat(Object.getOwnPropertySymbols(o))
    );
  };
} else {
  module.exports = Object.getOwnPropertyNames;
}
});

var es7ObjectPolyfill = (function () {
	"use strict";

	var ownKeys      = index;
	var reduce       = Function.bind.call(Function.call, Array.prototype.reduce);
	var isEnumerable = Function.bind.call(Function.call, Object.prototype.propertyIsEnumerable);
	var concat       = Function.bind.call(Function.call, Array.prototype.concat);

	if (!Object.values) {
		 Object.values = function values(O) {
			return reduce(ownKeys(O), (v, k) => concat(v, typeof k === 'string' && isEnumerable(O, k) ? [O[k]] : []), []) }; }

	if (!Object.entries) {
		 Object.entries = function entries(O) {
			return reduce(ownKeys(O), (e, k) => concat(e, typeof k === 'string' && isEnumerable(O, k) ? [[k, O[k]]] : []), []) }; }

	return Object

}) ();

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
