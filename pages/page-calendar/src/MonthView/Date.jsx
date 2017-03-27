import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import moment from 'moment';
import { connect } from 'react-redux';
import { classlist as cx } from '@ubc-farm/utils';
import { getDate, selectDate } from '../redux/currentView.js';
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
			<div
				className={cx('MonthView-Date-wrapper', {
					'MonthView-Date-wrapper--current': isCurrent,
					'MonthView-Date-wrapper--today': isToday,
				})}
			>
				<span className="MonthView-Date-num">{ date.date() }</span>
				{ children }
			</div>
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
	(state, { date }) => {
		const currentDate = getDate(state);

		const isOtherMonth = !date.isSame(currentDate, 'month');
		const isCurrent = date.isSame(currentDate, 'day');
		const isToday = date.isSame(moment(), 'day');

		return {
			isOtherMonth,
			isCurrent,
			isToday,
			children: isOtherMonth || isCurrent || isToday
				? null
				: <DateEvents dayOfMonth={date.date()} />,
		};
	},
	(dispatch, { date }) => ({
		onClick(e) {
			e.preventDefault();
			dispatch(selectDate(date));
		},
	}),
)(DateElement);
