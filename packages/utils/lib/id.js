/**
 * Generate unique IDs. Guaranteed to be unique when compared to other strings
 * generated by this function. The strings are complex enough that they
 * shouldn't be accidentally duplicated by hand.
 *
 * Math.random should be unqiue because of its seeding algorithm.
 * Convert it to base 36 (numbers + letters), and grab the first 9 characters
 * after the decimal.
 *
 * @param {string} [prefix='_'] used to change the ID prefix. Use an empty string
 * for no prefix.
 * @returns {string}
 * @see https://gist.github.com/gordonbrander/2230317
 */
export default function id(prefix = '_') {
	return prefix + Math.random().toString(36).substr(2, 9);
}
