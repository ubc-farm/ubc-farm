import {createElement as h, PropTypes} from 'react'; /** @jsx h */
import {
	shortWeekdayNames, toRfcDate, equal
} from 'ubc-farm-utils/calendar/index.js';

const AgendaDayHeader = ({date, onClick, today = new Date()}) => {
	const day = date.getDate(), label = shortWeekdayNames[date.getDay()];
	const timestamp = toRfcDate(date);

	let className = 'agenda-label ';
	if (equal(date, today)) className += 'agenda-label-today';
	else if (date < today) className += 'agenda-label-past';
	//else if (date > today) className += 'agenda-label-future';

	return (
		<time className={className} dateTime={timestamp} onClick={onClick}>
			<span className='agenda-label-date'>{day}</span>
			<span className='agenda-label-weekday'>{label}</span>
		</time>
	);
}

AgendaDayHeader.propTypes = {
	date: PropTypes.instanceOf(Date).isRequired,
	today: PropTypes.instanceOf(Date),
	onClick: PropTypes.func
}

export default AgendaDayHeader;