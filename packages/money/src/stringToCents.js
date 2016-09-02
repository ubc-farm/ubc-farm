/**
 * Converts a string representing money to a number representing cents
 * @param {string} str - value converted into the Money value.
 * Any non-digit values, except for the first . character,
 * are stripped and the result is stored.
 * @param {boolean} [options.trunc] - truncate fractional cents.
 * If true, an integer will be returned.
 * @returns {number}
 */
export default function convertString(str, { trunc = false } = {}) {
	if (typeof str !== 'string') throw new TypeError(`${str} must be a string`);

	let stripped = str.replace(/[^-0-9().]/g, '');
	if (stripped.includes('(') || stripped.includes(')')) {
		if (stripped.startsWith('(') && stripped.endsWith(')')) {
			stripped = `-${stripped}`;
		}
		stripped = stripped.replace(/\(|\)/g, '');
	}

	const [dollars, ...centsStrings] = stripped.split('.');
	const centString = centsStrings.join('');

	if (!dollars && !centString) return NaN;

	let value;
	if (dollars === '') value = 0;
	else if (dollars === '-') value = -0;
	else value = parseInt(dollars, 10) * 100;

	let centValue = 0;
	if (centString.length === 1) {
		centValue = parseInt(`${centString.charAt(0)}0`, 10);
	} else if (centString.length >= 2) {
		const firstTwoCents = centString.slice(0, 2);
		centValue = parseInt(firstTwoCents, 10);
	}

	if (!trunc && centString.length > 2) {
		const fraction = `.${centString.slice(2)}`;
		centValue += parseFloat(fraction);
	}

	if (value < 0 || Object.is(value, -0)) value -= centValue;
	else value += centValue;

	return value;
}
