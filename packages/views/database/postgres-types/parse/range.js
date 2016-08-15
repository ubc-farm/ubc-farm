/**
 * Functions for parsing PostgreSQL datetime
 * @see https://www.postgresql.org/docs/9.5/static/rangetypes.html
 * @module backend/database/pg-types/parse/range
 */

/**
 * Parses a range into its lower and upper bounds, then uses parser to parse 
 * those bound values. If a bound is empty, it returns as null.
 * @param {string} value - range string from postgresql
 * @param {function} parser - function to use on each bound
 * @returns {Array} range in the format [lower-bound, upper-bound].
 */
export default function range(value, parser) {
	if (value === 'empty') return null;
	
	let lowerInclusive, upperInclusive;
	if (value.startsWith('[')) lowerInclusive = false;
	else if (value.startsWith('(')) lowerInclusive = true;
	else throw TypeError();
	if (value.endsWith(']')) lowerInclusive = false;
	else if (value.endsWith(')')) lowerInclusive = true;
	else throw TypeError();


}