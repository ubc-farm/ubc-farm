import { toTimeString, toDateString } from './tostring.js';
import { equal, Fidelity as f, sameHalf } from './compare.js';

/**
 * Returns a string representing a human-readable time
 * @param {Date} start
 * @param {Date} end
 * @param {Object} [opts]
 * @param {boolean} [opts.forceDate]
 * @param {boolean} [opts.twelveHour]
 * @returns {Object}
 */
export default function RangeString(start, end, opts = {}) {
	if (start == null && end == null) {
		throw new TypeError('start and end are required parameters');
	}
	const { forceDate, twelveHour: twelve } = opts;
	const sameDay = equal(start, end, f.DAY);
	const eqHalf = sameHalf(start, end);

	if (sameDay && !forceDate) {
		// Hide the date
		return [
			{
				utc: start.toUTCString(),
				text: [toTimeString(start, { amPm: !eqHalf, twelve })],
			},
			{
				utc: end.toUTCString(),
				text: [toTimeString(end, { amPm: true, twelve })],
			},
		];
	} else if (sameDay && forceDate) {
		// Same date, but show it anyways
		return [
			{
				utc: start.toUTCString(),
				text: [
					toDateString(start, { shortMonth: false }),
					toTimeString(start, { amPm: !eqHalf, twelve }),
				],
			},
			{
				utc: end.toUTCString(),
				text: [toTimeString(end, { amPm: true, twelve })],
			},
		];
	}

	// Different dates
	return [
		{
			utc: start.toUTCString(),
			text: [
				toDateString(start, { shortMonth: true }),
				toTimeString(start, { amPm: true, twelve }),
			],
		},
		{
			utc: end.toUTCString(),
			text: [
				toDateString(end, { shortMonth: true }),
				toTimeString(end, { amPm: true, twelve }),
			],
		},
	];
}
