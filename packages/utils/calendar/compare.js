/**
 * Enum for date fidelity levels
 * @enum
 */
export const Fidelity = {
	YEAR: 1,
	MONTH: 2,
	DAY: 3,
	HOUR: 4,
	MINUTE: 5,
	SECOND: 6,
	MILLISECOND: 7
}

const dateGets = [
	'getFullYear',
	'getMonth',
	'getDate',
	'getHours',
	'getMinutes',
	'getSeconds',
	'getMilliseconds'
]

const labels = dateGets
	.map(f => f.substr(3).toLowerCase())
	.map(f => f.endsWith('s') ? f.slice(-1) : f);

/**
 * Compares two dates at higher and higher fidelities.
 * @param {Date} date1
 * @param {Date} date2
 * @param {number} max - how exact to check the dates
 * @returns {Generator<boolean|Object>} returns an object when .return is called
 */
export function* comparinator(date1, date2, max = 7) {
	const call = (i, thisArg) => Date.prototype[dateGets[i]].call(thisArg);
	let c = {};
	try {
		for (let fidelity = 0; fidelity <= max; fidelity++) {
			const label = labels[fidelity];
			yield c[label] = call(fidelity, date1) === call(fidelity, date2);
		}
	} finally {
		return c;
	}
}

/**
 * Compares two dates and returns an object with boolean values
 * @param {Date} date1
 * @param {Date} date2
 * @param {number} fidelity - how exact to check the dates
 * @returns {Object}
 */
export function compare(date1, date2, fidelity = 3) {
	if (fidelity < 0 || fidelity > 7)
		throw TypeError('fidelity must be between 0-7');
	
	const gen = comparinator(date1, date2);
	for (let i = 0; i < fidelity; i++) gen.next();
	return gen.return().value;
}

/**
 * Checks if two dates are equal up to the given fidelity.
 * Higher fidelity will cause the dates to be checked in greater detail
 * @param {Date} date1
 * @param {Date} date2
 * @returns {boolean}
 */
export function equal(date1, date2, fidelity = Fidelity.DAY) {
	if (fidelity >= Fidelity.MILLISECOND) return Number(date1) === Number(date2);

	const gen = comparinator(date1, date2);
	for (let i = 0; i < fidelity; i++) {
		const {value} = gen.next();
		if (!value) return value;
	}
	return true;
}

/**
 * Checks if both dates are in the same half of a day in a 12-hour clock.
 * Only the time is considered; differences in the year/month/date are ignored
 * @param {Date} date1
 * @param {Date} date2 
 * @returns {string} '' if false, or either 'AM' or 'PM' 
 */
export function sameHalf(date1, date2) {
	const m1 = date1.getHours() < 12 ? 'AM' : 'PM', 
	      m2 = date2.getHours() < 12 ? 'AM' : 'PM';
	if (m1 === m2) return m1;
	else return '';
}