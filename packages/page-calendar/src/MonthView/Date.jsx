import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import moment from 'moment';
import { classlist as cx } from '@ubc-farm/utils';

const EventIndicator = ({ color }) => (
	<li
		className={cx(
			'calendarmonth-Date-event',
			{ 'calendarmonth-date-event--more': !color },
		)}
		style={color ? { backgroundColor: color } : null}
	/>
);
EventIndicator.propTypes = { color: PropTypes.string };

export default function DateElement({ children, currentDate, onClick, events }) {
	if (children === null) {
		return <div className="calendarmonth-Date calendarmonth-Date--blank" />;
	}

	const thisDate = moment(currentDate)
		.set({ day: children, millisecond: 0, second: 0, minute: 0, hour: 0 });

	const eventIcons = [];
	for (const event of events) {
		if (!eventIcons.includes(event)) {
			if (eventIcons.length <= 2) {
				eventIcons.push(<EventIndicator color={event} />);
			} else {
				eventIcons.push(<EventIndicator color={null} />);
				break;
			}
		}
	}

	return (
		<div
			onClick={onClick}
			className={cx('calendarmonth-Date', {
				'calendarmonth-Date--current': thisDate.isSame(currentDate, 'day'),
				'calendarmonth-Date--today': thisDate.isSame(moment(), 'day'),
			})}
		>
			<span className="calendarmonth-Date-num">{ children }</span>
			<ul className="calendarmonth-Date-events">{ eventIcons }</ul>
		</div>
	);
}

DateElement.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.oneOf([null]),
	]).isRequired,
	currentDate: PropTypes.instanceOf(Date),
	onClick: PropTypes.func,
	events: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.string),
		PropTypes.instanceOf(Set),
	]),
};
