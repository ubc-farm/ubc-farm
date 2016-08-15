/**
 * @type {Object}
 * @property {string[]} months
 * @property {string[]} weeks
 */
const long = {
	months: ['January', 'February', 'March', 'April', 'May', 'June', 'July',
		'August', 'September', 'October', 'November', 'December'],
	weeks: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Friday', 'Saturday']
}

/**
 * @type {Object}
 * @property {string[]} months
 * @property {string[]} weeks
 */
const short = {
	months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept',
		'Oct', 'Nov', 'Dec'],
	weeks: ['Sun', 'Mon', 'Tue',	'Wed', 'Thu', 'Fri', 'Sat']
}

export {long, short};
export default long.months;