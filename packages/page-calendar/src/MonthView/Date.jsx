import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import moment from 'moment';
import { connect } from 'react-redux';
import { classlist as cx } from '@ubc-farm/utils';
import { selectDay } from '../redux/currentDate.js';
import DateEvents from './DateEvents.jsx';

/**
 * Used to represent a single date of the month inside the month view.
 */
function DateElement({ date, isCurrent, isToday, isOtherMonth, onClick, children }) {
	return (
		<a
			onClick={onClick}
			href={`#${date.format('Y-MM-DD')}`}
			className={cx('MonthView-Date', {
				'MonthView-Date--current': isCurrent,
				'MonthView-Date--today': isToday,
				'MonthView-Date--othermonth': isOtherMonth,
			})}
		>
			<span className="MonthView-Date-num">{ date.date() }</span>
			{ children }
		</a>
	);
}

DateElement.propTypes = {
	date: PropTypes.instanceOf(moment).isRequired,
	onClick: PropTypes.func,
	children: PropTypes.node,
	isCurrent: PropTypes.bool,
	isToday: PropTypes.bool,
	isOtherMonth: PropTypes.bool,
};

export default connect(
	(state, { date, currentDate }) => {
		const isOtherMonth = !date.isSame(currentDate, 'month');
		return {
			isOtherMonth,
			isCurrent: date.isSame(currentDate, 'day'),
			isToday: date.isSame(moment(), 'day'),
			children: isOtherMonth
				? null
				: <DateEvents dateIso={date.format('YYYY-MM-DD')} />,
		};
	},
	(dispatch, { date, currentDate }) => ({
		onClick(e) {
			e.preventDefault();
			dispatch(selectDay(date.date(), !date.isSame(currentDate, 'month')));
		},
	}),
)(DateElement);
