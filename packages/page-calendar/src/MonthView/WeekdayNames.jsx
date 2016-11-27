import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import moment from 'moment';

export default function WeekdayNames({ single, fiveDay }) {
	let weekdays = moment.weekdaysMin(true);
	if (fiveDay) weekdays = weekdays.slice(1, 6);

	return (
		<div className="MonthView-WeekdayNames">
			{ weekdays.map(weekday => (
				<span className="MonthView-WeekdayNames-weekday" key={weekday}>
					{ single ? weekday.charAt(0) : weekday }
				</span>
			)) }
		</div>
	);
}

WeekdayNames.propTypes = {
	single: PropTypes.bool,
	fiveDay: PropTypes.bool,
};
