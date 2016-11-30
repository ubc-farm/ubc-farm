import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import { connect } from 'react-redux';
import { classlist as cx } from '@ubc-farm/utils';
import { getEventTypes } from '../redux/events.js';

/**
 * Used to represent a single date of the month inside the month view.
 */
function DateEvents({ events }) {
	const moreEvents = events.length > 2;
	return (
		<ul className="MonthView-DateEvents">
			{ events.slice(0, 2).map(event => (
				<li key={event} className={cx('MonthView-DateEvents-event', event)} />
			)) }
			{ moreEvents ? <li className="MonthView-DateEvents-more">+</li> : null }
		</ul>
	);
}

DateEvents.propTypes = {
	events: PropTypes.arrayOf(PropTypes.string),
};

export default connect(
	(state, { dateIso }) => ({
		// events: Array.from(getEventTypes(state, dateIso)),
		events: ['e-one', 'e-two', 'e-three'],
	}),
)(DateEvents);
