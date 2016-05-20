/**
 * Helper functions related to money
 * @module
 */

/**
 * Convert integer representing cents to a string
 * @param {number} cents
 * @param {boolean} [dollarSign=true] - prefix string with a dollar sign?
 * @param {boolean} [emptyZero=true] - prefix >100 cents with a zero?
 * @returns {string} cents formatted as string
 * @example
 * // returns $1.23
 * exports.toMoney(123);
 * @example
 * // returns 0.65
 * exports.toMoney(65, false);
 * @example
 * // returns $.24
 * exports.toMoney(24, , false);
 */
exports.toMoney = (cents, dollarSign = true, emptyZero = true) => {
	let prefix = '', str = cents.toString();
	if (dollarSign) prefix = '$';
	if (cents < 100 && emptyZero) {
		prefix = prefix + '0';
		return `${prefix}.${str}`;
	}
	
	return `${prefix}${str.slice(0, -2)}.${str.slice(-2)}`;
}