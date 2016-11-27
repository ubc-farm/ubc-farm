import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import moment from 'moment';
import { connect } from 'react-redux';
import { getCurrentDate } from '../redux/currentDate.js';
import WeekdayNames from './WeekdayNames.jsx';
import Week from './Week.jsx';

function MonthView({ currentDate, fiveDay }) {
	const copy = moment(currentDate);
	const startWeek = copy.startOf('month').week();
	const endWeek = copy.endOf('month').week();

	const children = [];
	for (let i = startWeek; i <= endWeek; i += 1) {
		children.push(<Week key={i} weekNum={i} fiveDay={fiveDay} currentDate={currentDate}	/>);
	}

	return (
		<div className="MonthView">
			<h4 className="MonthView-header">
				{ currentDate.format('MMMM') }
			</h4>
			<WeekdayNames single fiveDay={fiveDay} />
			{ children }
		</div>
	);
}

MonthView.propTypes = {
	currentDate: PropTypes.instanceOf(Date).isRequired,
	fiveDay: PropTypes.bool,
};

export default connect(
	state => ({ currentDate: getCurrentDate(state) }),
)(MonthView);
