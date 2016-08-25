import { long, short } from './labels.js';

const { months } = long; const shortMonths = short.months;

/**
 * Used to render a time. You can either pass in a date object or pass in
 * a time string in format HHMM (such as 1300 for 13 o'clock / 1 pm).
 * @param {Date|string} date object or a string
 * @param {boolean} [amPm=true] - set to false to prevent AM/PM from showing
 * @param {boolean} [trailing=false] - set to false to truncate hours,
 * i.e.: 12:00 becomes 12 instead.
 * @param {boolean} [twelve=true] - true to use 12 hours clock, false to use 24
 * @returns {string}
 */
export function toTimeString(date, options = {}) {
	const { amPm = true, trailing = false, twelve = true } = options;

	let dateObj;
	if (typeof date === 'string') {
		const time = date.toString();
		const min = parseInt(time.slice(-2), 10);
		const hr = time.length > 2 ? parseInt(time.slice(0, -2), 10) : 0;

		dateObj = new Date(0);
		dateObj.setHours(hr, min);
	} else if (date == null) {
		return '';
	} else {
		dateObj = date;
	}

	const minute = dateObj.getMinutes();
	let hour = dateObj.getHours();
	let amPmStr = '';
	if (twelve) {
		if (hour === 0) {
			hour = 12;
			if (amPm) amPmStr = ' AM';
		} else if (amPm && hour === 12) {
			amPmStr = ' PM';
		} else if (hour > 12) {
			hour %= 12;
			if (amPm) amPmStr = ' PM';
		} else if (amPm) { amPmStr = ' AM'; }
	}

	const minString = !trailing || minute !== 0 ? `:${minute.toString()}` : '';

	return hour.toString() + minString + amPmStr;
}

/**
 * Used to render a date. You can pass a Date object or an object with the
 * correct properties.
 * @param {Date|Object} date object or json object
 * @param {number} date.date
 * @param {number} date.month
 * @param {number} date.year
 * @param {boolean} [showYear=false] - wheter or not to display the year
 * @param {boolean} [shortMonth=true] - wheter or not to shorten the month
 * @returns {string}
 */
export function toDateString(date, options = {}) {
	const { showYear = false, shortMonth = true } = options;

	const dateObj = date instanceof Date
		? date : new Date(date.year, date.month, date.date);

	const yearString = showYear ? ` ${dateObj.getFullYear()}` : '';
	const month = shortMonth
		? shortMonths[dateObj.getMonth()]
		: months[dateObj.getMonth()];

	return `${dateObj.getDate()} ${month}${yearString}`;
}
