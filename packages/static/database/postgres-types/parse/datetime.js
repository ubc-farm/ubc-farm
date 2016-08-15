/**
 * Functions for parsing PostgreSQL datetime
 * @see https://www.postgresql.org/docs/9.5/static/datatype-datetime.html
 * @module backend/database/pg-types/parse/datetime
 */

/**
 * Parses an ISO timestamp
 * @param {string} value - an ISO timestamp
 * @returns {Date}
 */
export function timestamp(value) {
	return new Date(Date.parse(value));
}

/**
 * Parses an ISO time timestamp, and sets the date to epoch.
 * @param {string} value - an ISO timestamp in the format 00:00:00
 * @returns {Date}
 */
export function time(value) { 
	return timestamp('1970-01-01 ' + value);
}

const pgInterval = '^@ ', 
	pgYearMonth = '([0-9+-]+) year ([0-9+-]+) mons',
	pgDayTime = '([0-9+-]+) days ([0-9+-]{2}):([0-9+-]{2}):([0-9+-]{2})$';

const mixed = new RegExp(pgInterval + pgYearMonth + ' ' + pgDayTime);
const yearMonth = new RegExp(pgInterval + pgYearMonth + '$');
const dayTime = new RegExp(pgInterval + pgDayTime);
/**
 * Parses a PostgreSQL interval and returns and object describing the
 * interval. 
 * @param {string} value - Interval in the postgres format.
 * @returns {Object} 
 */
export function interval(value) {
	let [years, months, days, hours, minutes, seconds] = Array(6).fill(null);
	if (value.includes('mons') && value.includes('days')) {
		[, years, months, days, hours, minutes, seconds] = mixed.exec(value);
	} else if (value.includes('mons')) {
		[, years, months] = yearMonth.exec(value);
	} else if (value.includes('days')) {
		[, days, hours, minutes, seconds] = dayTime.exec(value);
	} else {
		throw TypeError();
	}

	return {
		years: parseInt(years) || null, 
		months: parseInt(months) || null, 
		days: parseInt(days) || null, 
		hours: parseInt(hours) || null, 
		minutes: parseInt(minutes) || null, 
		seconds: parseInt(seconds) || null
	};
}