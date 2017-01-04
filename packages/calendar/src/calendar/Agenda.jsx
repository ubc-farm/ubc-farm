import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import moment from 'moment';
import 'twix';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeView, backDate, nextDate, goToToday } from '../redux/actions';
import { getDate } from '../redux/selectors.js';
import { viewNames } from '../utils/propTypes.js';
import splitEvents, { propTypes as splitProps } from '../utils/splitEvents.js';
import filterEvents from '../utils/filterEvents.js';
import DateLink from './DateLink.jsx';

const AgendaDay = ({ date, children }) => (
	<section className="cal-agn-date">
		<header className="cal-agn-date-header">
			<DateLink date={date} className="cal-agn-date-weekday">
				{date.format('dddd')}
			</DateLink>
			<DateLink date={date} className="cal-agn-date-formatted">
				{date.format('MMMM D, Y')}
			</DateLink>
		</header>
		{ children }
	</section>
);
AgendaDay.propTypes = {
	date: PropTypes.instanceOf(moment),
	children: PropTypes.node,
};


let AgendaEvent = ({ title, timeText }) => (
	<li className="cal-event cal-agn-event">
		<span className="cal-event-time cal-agn-event-time">{timeText}</span>
		<h6 className="cal-event-title cal-agn-event-title">
			<a className="cal-event-link cal-agn-event-link">
				{title}
			</a>
		</h6>
	</li>
);
AgendaEvent.propTypes = {
	title: PropTypes.string,
	timeText: PropTypes.string,
};

const calendarFormats = { sameDay: 'h:mm A' };
AgendaEvent = connect(
	(state, event) => {
		const { allDay, start, end } = event;
		const currentDate = getDate(state);

		let timeText;
		if (allDay) timeText = 'allDay';
		else {
			timeText = start.calendar(currentDate, calendarFormats);
			if (end) timeText += ` ${end.calendar(currentDate, calendarFormats)}`;
		}
		return Object.assign({}, event, { timeText, currentDate: null });
	},
)(AgendaEvent);


const agendaDuration = moment.duration(1, 'week');
let Agenda = ({ days }) => {
	const list = [];
	for (const [day, events] of days) {
		const eventList = events.map(event => <AgendaEvent {...event} />);
		const dayElement = (
			<AgendaDay date={moment(day)}>
				<ul className="cal-agn-events-list">{eventList}</ul>
			</AgendaDay>
		);

		list.push(dayElement);
	}

	return <section className="cal-agn">{list}</section>;
};
Agenda = splitEvents(Agenda);
Agenda = connect(
	(state, { events }) => {
		const range = agendaDuration.afterMoment(getDate(state));
		return { events: filterEvents(range, events) };
	}
)(Agenda);
Agenda.propTypes = splitProps;

export {
	Agenda as default,
	AgendaDay,
	AgendaEvent,
};
