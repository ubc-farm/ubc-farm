import {createElement as h, PropTypes} from 'react'; /** @jsx h */
import {equal} from 'ubc-farm-utils/calendar/index.js';
import AgendaItem from './item.js';
import AgendaDayHeader from './day-header.js';
import Loader from './loader.js';

const AgendaDayList = ({
	date, events = [], today = new Date(),
	onHeaderClick, onItemClick
}) => {
	const isToday = equal(date, today);
	let eventList = [], lastStart = 0;
	for (const event of events) {
		const onAction = type => onItemClick(event, type);
		
		if (isToday) {
			if (today > lastStart && today < event.start) 
				eventList.push(<hr className='agenda-now-marker' />);
			lastStart = event.start;
		}

		eventList.push(
			<AgendaItem {...event} key={event.id} onAction={onAction} />
		);
	}

	return (
		<section className='agenda-date-list'>
			<AgendaDayHeader date={date} onClick={onHeaderClick} today={today} />
			{events.length === 0 
				? <Loader />
				: <ol className='agenda-date-list-contents'>{eventList}</ol>
			}
		</section>
	);
}

AgendaDayList.propTypes = {
	date: PropTypes.instanceOf(Date).isRequired,
	events: PropTypes.arrayOf(PropTypes.object),
	today: PropTypes.instanceOf(Date),
	onHeaderClick: PropTypes.func,
	onItemClick: PropTypes.func
}

export default AgendaDayList;