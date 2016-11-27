import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import moment from 'moment';
import { connect } from 'react-redux';
import { classlist as cx } from '@ubc-farm/utils';
import { selectDay } from '../redux/currentDate.js';
import DateEvents from './DateEvents.jsx';

/**
 * Used to represent a single date of the month inside the month view.
 */
function DateElement({ thisDate, currentDate, onClick, children }) {
	return (
		<div
			onClick={onClick}
			className={cx('MonthView-Date', {
				'MonthView-Date--current': thisDate.isSame(currentDate, 'day'),
				'MonthView-Date--today': thisDate.isSame(moment(), 'day'),
				'MonthView-Date--othermonth': !thisDate.isSame(currentDate, 'month'),
			})}
		>
			<span className="MonthView-Date-num">{ thisDate.date() }</span>
			{ children }
		</div>
	);
}

DateElement.propTypes = {
	// date: PropTypes.number.isRequired,
	thisDate: PropTypes.instanceOf(moment).isRequired,
	currentDate: PropTypes.instanceOf(Date).isRequired,
	onClick: PropTypes.func,
	children: PropTypes.node,
};

export default connect(
	(state, { date, currentDate }) => {
		const thisDate = moment(currentDate).set(date, 'day');
		const children = <DateEvents dateIso={thisDate.format('YYYY-MM-DD')} />;
		return { thisDate, children };
	},
	(dispatch, { date }) => ({
		onClick() { dispatch(selectDay(date)); },
	}),
)(DateElement);
