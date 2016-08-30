import { ADD_SELECTION, REMOVE_SELECTION } from './actions/index.js';

/**
 * Tracks selected rows as a set of indexes
 */
export default function selected(state = new Set(), action) {
	switch (action.type) {
		case ADD_SELECTION:
			return new Set([...state, ...action.payload]);

		case REMOVE_SELECTION: {
			const nextState = new Set(state);
			for (const id of action.payload) nextState.delete(id);
			return nextState;
		}

		default: return state;
	}
}
