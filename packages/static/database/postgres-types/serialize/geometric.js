/**
 * Functions for serializing PostgreSQL geometry
 * @see https://www.postgresql.org/docs/9.5/static/datatype-geometric.html
 * @module backend/database/pg-types/serialize/geometric
 */

/**
 * Serializes a PostgreSQL point from a float array.
 * @param {float[]} value
 * @returns {string} point in format ( x , y )
 */
export function point([x, y]) {
	return `( ${x} , ${y} )`;
}

/**
 * Serializes a PostgreSQL path from a point array.
 * @param {float[]} value
 * @param {boolean} [open=false] is the path open?
 * @param {boolean} value.open - sets open to true if this property exists
 * @returns {string} path in format ( ( x1 , y1 ) , ... , ( xn , yn ) )
 */
export function path(value, open = false) {
	let start = '(', end = ')';
	if (open || path.hasOwnProperty('open')) start = '['; end = ']';

	return start + value.map(val => {
		const [x, y] = val;
		return ` ( ${x} , ${y} ) `;
	}).join() + end;
}

/**
 * Serializes a PostgreSQL circle from an object
 * @param {string} value
 * @returns {Object} circle in format < ( x , y ) , r >
 */
export function circle({center, radius: r}) {
	const [x, y] = center;
	return `< ( ${x} , ${y} ) , ${r} >`;
}