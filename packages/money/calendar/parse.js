export function parseDate(mmddyyyy) {
	const [month, date, year] = mmddyyyy.split('/').map(n => parseInt(n));
	return {month, date, year};
}

export function parseTime(hhmmPM) {
	const [hhmm, ampm] = hhmmPM.toLowerCase().split(' ');
	let [hour, minute] = hhmm.split(':').map(n => parseInt(n));
	
	if (hour === 12 && ampm === 'am') hour = 0;
	else if (hour !== 12 && ampm === 'pm') hour += 12;

	return {hour, minute};
}

export default function parse(day, time) {
	const {month, date, year} = parseDate(day);
	const {hour, minute} = parseTime(time);
	return new Date(year, month, date, hour, minute);
}