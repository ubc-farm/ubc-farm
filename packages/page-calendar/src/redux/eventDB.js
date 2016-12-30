const ADD_EVENT = 'calendar/eventDB/ADD_EVENT';
const EDIT_EVENT = 'calendar/eventDB/EDIT_EVENT';
const REMOVE_EVENT = 'calendar/eventDB/REMOVE_EVENT';

// Reducer
export default function eventDB(state = [], action) {
	switch (action.type) {
		case ADD_EVENT:
			return [action.payload, ...state];

		case EDIT_EVENT: {
			const id = action.meta.id || action.payload._id;
			const changes = action.payload;
			return state.map(event => (
				event._id === id
					? Object.assign({}, event, changes)
					: event
			));
		}

		case REMOVE_EVENT: {
			const id = action.meta.id;
			return state.filter(event => event._id !== id);
		}

		default:
			return state;
	}
}


// Selectors
export const getEvents = state => state.eventDB;

// Actions
export const addEvent = event => ({ type: ADD_EVENT, payload: event });
export const editEvent = (changes, id) => ({
	type: EDIT_EVENT, payload: changes, meta: { id },
});
export const removeEvent = id => ({ type: REMOVE_EVENT, meta: { id } });
