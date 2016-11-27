import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import moment from 'moment';

import WeekdayNames from './WeekdayNames.jsx';
import Week from './Week.jsx';

export default function MonthView({ currentDate, fiveDay }) {
	const copy = moment(currentDate);
	const startWeek = copy.startOf('month').week();
	const endWeek = copy.endOf('month').week();

	const children = [];
	for (let i = startWeek; i <= endWeek; i += 1) {
		children.push(<Week key={i} weekNum={i} fiveDay={fiveDay}	/>);
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
