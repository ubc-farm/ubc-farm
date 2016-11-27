import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import moment from 'moment';
import { classlist as cx } from '@ubc-farm/utils';

/**
 * Used to represent a single date of the month inside the month view.
 */
export default function DateElement({ date, currentDate, onClick, children }) {
	const thisDate = moment(currentDate).set(children, 'day');

	return (
		<div
			onClick={onClick}
			className={cx('MonthView-Date', {
				'MonthView-Date--current': thisDate.isSame(currentDate, 'day'),
				'MonthView-Date--today': thisDate.isSame(moment(), 'day'),
				'MonthView-Date--othermonth': !thisDate.isSame(currentDate, 'month'),
			})}
		>
			<span className="MonthView-Date-num">{ date }</span>
			{ children }
		</div>
	);
}

DateElement.propTypes = {
	date: PropTypes.number.isRequired,
	currentDate: PropTypes.instanceOf(Date).isRequired,
	onClick: PropTypes.func,
	children: PropTypes.node,
};
