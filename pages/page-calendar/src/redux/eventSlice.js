import { handle } from 'redux-pack';

function findEvents([rangeStart, rangeEnd]) {
	return db.find({
		selector: {
			start: { $lt: rangeEnd.valueOf() },
			end: { $gt: rangeStart.valueOf() },
		},
		fields: ['_id', 'title', 'allDay', 'start', 'end'],
	});
}


const REFRESH_EVENTS = 'calendar/eventSlice/REFRESH_EVENTS';

// Reducer
export default function eventSliceReducer(state = [], action) {
	switch (action.type) {
		case REFRESH_EVENTS: {
			const { payload } = action;
			return handle(state, action, {
				success: () => payload.docs,
			});
		}
		default:
			return state;
	}
}


// Selectors
export const getEvents = state => state.eventSlice;

// Actions
export const refreshEvents = range => ({
	type: REFRESH_EVENTS,
	promise: findEvents(range),
	meta: {
		interval: `${range[0].format('Y-MM-DD')}/${range[1].format('Y-MM-DD')}`,
	},
});
