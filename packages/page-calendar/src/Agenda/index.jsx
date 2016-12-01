import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import { connect } from 'react-redux';
import moment from 'moment';
import { getCurrentDate } from '../redux/currentDate.js';
import { getSelectedEvents } from '../redux/events.js';
import Day from './Day.jsx';
import DateHeader from './DateHeader.jsx';

const Agenda = ({ events, date }) => (
	<div className="Agenda">
		<a>Yesterday</a>
		<Day
			events={events}
			dayHeader={<DateHeader date={date} />}
		/>
		<a>Tomorrow</a>
	</div>
);

Agenda.propTypes = {
	date: PropTypes.instanceOf(moment).isRequired,
	events: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(
	state => ({
		date: getCurrentDate(state),
		events: getSelectedEvents(state),
	}),
)(Agenda);
