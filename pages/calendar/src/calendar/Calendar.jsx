import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import moment from 'moment';
import { connect } from 'react-redux';
import { getDate, getView } from '../redux/selectors.js';

import Toolbar from './Toolbar.jsx';
import Agenda, { AgendaDay, AgendaEvent } from './Agenda.jsx';

const Calendar = ({ date, view, events }) => {
	let inner = null;

	switch (view) {
		case 'agenda': {
			inner = <Agenda events={events} />;
			break;
		}
	}

	return (
		<section className="cal-container">
			<Components.toolbar view={view} />
			{inner}
		</section>
	)
};

Calendar.propTypes = {
	date: PropTypes.instanceOf(moment),
	view: PropTypes.oneOf('month', 'week', 'day', 'agenda'),
	events: PropTypes.arrayOf(PropTypes.shape({
		title: PropTypes.string,
		allDay: PropTypes.bool,
		start: PropTypes.instanceOf(moment),
		end: PropTypes.instanceOf(moment),
	})).isRequired,
};

Calendar.defaultProps = {
	date: moment(),
	view: 'agenda',
	components: {
		toolbar: Toolbar,
		agenda: {},
		day: {},
		week: {},
		month: {},
	},
};

export default connect(
	state => ({
		date: getDate(state),
		view: getView(state),
	})
)(Calendar);
