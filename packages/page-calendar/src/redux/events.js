import moment from 'moment';

export const DESERIALIZE_EVENTS = 'calendar/currentDate/DESERIALIZE_EVENTS';


export default function currentDateReducer(state = {}, action) {
	switch (action.type) {
		case DESERIALIZE_EVENTS:
			if (action.error) return state;
			return Object.assign({}, state, action.payload);

		default:
			return state;
	}
}


export const getAllEvents = state => state.events;
/** @returns {Object[]} events on this day */
export const getEvents = (state, dateIso) => getAllEvents(state)[dateIso] || [];
/**
 * @param {string} dateIso in format YYYY-MM-DD
 * @returns {string[]} event types on this day
 */
export function getEventTypes(state, dateIso) {
	const types = getEvents(state, dateIso).map(event => event.type);
	return Array.from(new Set(types));
}
/**
 * @param {Date} month
 * @returns {string[][]} array of event type arrays. each sub array represents
 * one day.
 */
export function getMonthEventTypes(state, month) {
	const copy = moment(month);
	const daysInMonth = copy.daysInMonth();
	return new Array(daysInMonth).fill()
		.map((v, i) => getEventTypes(state, copy.date(i + i).format('YYYY-MM-DD')));
}
