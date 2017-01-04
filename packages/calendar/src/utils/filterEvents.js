import moment from 'moment';
import 'twix';

/**
 * Filters events to only include those that overlap the given range.
 * @param {Twix} range
 * @param {Object[]} events
 * @param {boolean} events[].allDay
 * @param {moment} events[].start
 * @param {moment} [events[].end] - if not given, 1 hour duration is assumed.
 * @returns {Object[]} filtered events array
 */
export default function filterEvents(range, events) {
	return events.filter(({ allDay, start, end }) => {
		const eventRange = start.twix(end || moment(start).add(1, 'hour'), { allDay });
		return eventRange.overlaps(range);
	});
}
