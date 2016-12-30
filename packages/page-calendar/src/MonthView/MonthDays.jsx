import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import moment from 'moment';
import { connect } from 'react-redux';
import { getDate } from '../redux/currentView.js';
import WeekdayNames from './WeekdayNames.jsx';
import Week from './Week.jsx';

function MonthDays({ currentDate, fiveDay, single }) {
	const copy = moment(currentDate);
	const startWeek = copy.startOf('month').week();
	const endWeek = copy.endOf('month').week();

	const children = [];
	for (let i = startWeek; i <= endWeek; i += 1) {
		children.push(<Week key={i} weekNum={i} {...{ fiveDay, currentDate }}	/>);
	}

	return (
		<div className="MonthView-MonthDays">
			<WeekdayNames {...{ single, fiveDay }} />
			{ children }
		</div>
	);
}

MonthDays.propTypes = {
	currentDate: PropTypes.instanceOf(Date).isRequired,
	fiveDay: PropTypes.bool,
	single: PropTypes.bool,
};

export default connect(
	state => ({ currentDate: getDate(state) }),
)(MonthDays);
