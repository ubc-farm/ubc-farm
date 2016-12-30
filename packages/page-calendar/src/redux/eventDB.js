import { createAction } from 'redux-actions';

const ADD_EVENT = 'calendar/eventDB/ADD_EVENT';
const EDIT_EVENT = 'calendar/eventDB/EDIT_EVENT';
const REMOVE_EVENT = 'calendar/eventDB/REMOVE_EVENT';

// Reducer
export default function eventDB(state = [], { type, payload, meta }) {
	switch (type) {
		case ADD_EVENT:
			return [payload, ...state];

		case EDIT_EVENT: {
			const id = meta.id || payload._id;
			const changes = payload;
			return state.map(event => (
				event._id === id
					? Object.assign({}, event, changes)
					: event
			));
		}

		case REMOVE_EVENT:
			return state.filter(event => event._id !== payload);

		default:
			return state;
	}
}


// Selectors
export const getEvents = state => state.eventDB;

// Actions
export const addEvent = createAction(ADD_EVENT);
export const editEvent = createAction(EDIT_EVENT,
	null,
	(changes, id) => ({ id }),
);
export const removeEvent = createAction(REMOVE_EVENT);
