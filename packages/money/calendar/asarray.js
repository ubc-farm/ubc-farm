/**
 * Creates a 2D array of the given month
 * @param {integer} value - date expressed in milliseconds
 * @returns {number[][]} 2D array resembling calendar
 */
export default function calendarArray(value = new Date(Date.now())) {
	const d = new Date(value);
	let dateObj = new Date(d.getFullYear(), d.getMonth() + 1, 0); 
	const maxDays = dateObj.getDate();
	
	const calendar = [
		Array(7).fill(null), 
		Array(7).fill(null),
		Array(7).fill(null),
		Array(7).fill(null),
		Array(7).fill(null),
		Array(7).fill(null)
	]
	
	let week = 0;
	for (let date = 1; date <= maxDays; date++) {
		dateObj.setDate(date);
		const day = dateObj.getDay();
		calendar[week][day] = date;
		if (day === 6) week += 1;
	}

	const hasSixWeeks = week === 5;
	if (!hasSixWeeks) calendar.splice(5, 1);
	
	return calendar;
}