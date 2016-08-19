/**
 * Formats a camelCase string into a string with normal casing and spaces.
 * @param {string} string
 * @returns {string}
 * @example
 * format('camelCaseText') //returns Camel Case Text
 */
export default function format(string) {
	if (typeof string === 'undefined') return undefined;
	const spaced = string.replace(/[A-Z]/g, match => ` ${match}`);
	return spaced.charAt(0).toUpperCase() + spaced.substr(1);
}
