/**
 * Converts a float representing dollars to a number representing cents
 * @param {number} float to convert into cents.
 * @param {boolean} [options.trunc] - truncate fractional cents.
 * If true, an integer will be returned.
 * @example
 * floatToCents(1.99) === 199
 * @example
 * floatToCents(8.959, { trunc: false }) === 895.9
 */
export default function floatToCents(float, { trunc = false } = {}) {
	if (typeof float !== 'number') {
		throw new TypeError(`${float} must be a number`);
	}

	const centString = trunc ? float.toFixed(2) : float.toString(10);
	const pointIndex = centString.indexOf('.');

	if (pointIndex === -1) return float * 100;

	const start = centString.slice(0, pointIndex);
	const middle = centString.slice(pointIndex + 1, pointIndex + 3);
	const end = centString.slice(pointIndex + 3);

	if (end.length === 0) return parseInt(`${start}${middle}`, 10);

	return parseFloat(`${start}${middle}.${end}`);
}
