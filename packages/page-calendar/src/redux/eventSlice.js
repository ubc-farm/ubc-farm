import { handle } from 'redux-pack';
import moment from 'moment';

function findEvents(date, view) {
	let start;
	let end;
	if (view === 'agenda') {
		start = moment(date).startOf('day');
		end = moment(start).add(1, 'weeks').endOf('day');
	} else {
		start = moment(date).startOf(view);
		end = moment(date).endOf(view);
	}

	return db.find({
		selector: {
			start: { $gte: start.valueOf(), $lt: end.valueOf() },
			end: { $gte: start.valueOf(), $lt: end.valueOf() },
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
				start: s => s,
				finish: s => s,
				failure: s => s,
				success: s => Object.assign({}, s, payload),
			});
		}
		default:
			return state;
	}
}


// Selectors
export const getEvents = state => state.eventSlice;

// Actions
export const refreshEvents = (date, view) => ({
	type: REFRESH_EVENTS,
	promise: findEvents(date, view),
});
