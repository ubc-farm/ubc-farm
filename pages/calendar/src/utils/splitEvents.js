import moment from 'moment';
import { mapProps } from 'recompose';
import { PropTypes } from 'react';
import sortEvents from './sortEvents.js';

/**
 * HOC that takes in a event prop and adds a days prop,
 * that sorts the events by their starting date.
 * Each event needs a `start` (moment) property.
 * `props.events` should be an array of events.
 * The computed prop `days` has type `Map<moment, Event>`.
 */
export default mapProps((props) => {
	const stringDays = sortEvents(props.events)
		.reduce((days, event) => {
			const day = event.start.format('Y-MM-DD');
			if (!days[day]) days[day] = [];
			days[day].push(event);
			return days;
		}, {});

	const days = new Map();
	for (const key of Object.keys(stringDays)) {
		days.set(moment(key, 'Y-MM-DD'), stringDays[key]);
	}

	return Object.assign({}, props, { days });
});

export const propTypes = Object.freeze({
	events: PropTypes.arrayOf(PropTypes.shape({
		start: PropTypes.instanceOf(moment).isRequired,
	})),
});
