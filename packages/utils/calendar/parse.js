export function parseDate(mmddyyyy) {
	const [month, date, year] = mmddyyyy.split('/').map(n => parseInt(n));
	return { month, date, year };
}

export function parseTime(hhmmPM) {
	const [hhmm, ampm] = hhmmPM.toLowerCase().split(' ');
	const [hour, minute] = hhmm.split(':').map(n => parseInt(n, 10));

	let hour24;
	if (hour === 12 && ampm === 'am') hour24 = 0;
	else if (hour !== 12 && ampm === 'pm') hour24 = hour + 12;

	return { hour: hour24, minute };
}

export default function parse(day, time) {
	const { month, date, year } = parseDate(day);
	const { hour, minute } = parseTime(time);
	return new Date(year, month, date, hour, minute);
}
