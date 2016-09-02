/**
 * Returns a formatted currency string.
 * If value is NaN, an empty string is returned.
 * @param {number} cents
 * @param {string} [locale]
 * @param {Object} [options]
 * @param {boolean} [options.parentheses] - wrap negative numbers
 * in parentheses
 * @param {string} [options.currency=USD] - currency locale to return
 * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
 */
export default function toString(cents, locale, options) {
	if (typeof locale === 'object' && /undefined|string/.test(typeof options)) {
		[locale, options] = [options, locale];
	}

	const float = cents / 100;
	if (Number.isNaN(float)) return '';

	const opts = Object.assign({ style: 'currency', currency: 'USD' }, options);

	if (opts.parentheses && float < 0) {
		const positive = Math.abs(float);
		const str = positive.toLocaleString(locale, opts);
		return `(${str})`;
	}

	return float.toLocaleString(locale, opts);
}
