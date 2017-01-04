import moment from 'moment';

/**
 * Returns a sorted array
 * @param {Object[]} events
 * @param {moment|Date} events[].start
 * @returns {Object[]} sorted array
 */
export default function sortEvents(events) {
	return events.sort((a, b) => moment(a.start).diff(b.start));
}
