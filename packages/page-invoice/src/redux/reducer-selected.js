import {
	TOGGLE_SELECTION,
	SET_SELECTION,
	CLEAR_SELECTION,
	EVERYTHING_SELECTION,
} from './actions.js';

export default function selected(state = new Set(), action, dataState) {
	switch (action.type) {
		case TOGGLE_SELECTION: {
			const id = action.payload;
			const newSelected = new Set(state);

			if (newSelected.has(id)) newSelected.delete(id);
			else newSelected.add(id);

			return newSelected;
		}
		case SET_SELECTION: {
			const id = action.meta;
			const status = action.payload;
			const newSelected = new Set(state);

			if (status) newSelected.add(id);
			else newSelected.delete(id);

			return newSelected;
		}
		case CLEAR_SELECTION:
			return new Set();
		case EVERYTHING_SELECTION:
			return new Set(dataState.keys());

		default: return state;
	}
}
