import { createAction } from 'redux-actions';

const ADD_COLUMN = 'directory/displayedColumns/ADD_COLUMN';
const REMOVE_COLUMN = 'directory/displayedColumns/REMOVE_COLUMN';
const MOVE_COLUMN = 'directory/displayedColumns/MOVE_COLUMN';

const defaultColumns = [
	'role', 'name', 'email', 'phoneNumber',
]

// Reducer
export default function displayedColumns(state = defaultColumns, { type, payload }) {
	switch (type) {
		case ADD_COLUMN: return [...state, payload];
		case REMOVE_COLUMN: return state.filter(key => key !== payload);

		case MOVE_COLUMN: {
			const toRemove = state.indexOf(payload.toMove);
			const newState = state.slice().splice(toRemove, 1);

			let newIndex = newState.indexOf(payload.placeAfter);
			if (newIndex < 0) newIndex = 0;
			return newState.splice(newIndex, 0, payload.toMove);
		}

		default: return state;
	}
}


// Selectors
export const getDisplayedColumns = state => state.displayedColumns;


// Actions
export const addColumn = createAction(ADD_COLUMN);
export const removeColumn = createAction(REMOVE_COLUMN);
export const moveColumn = (toMove, placeAfter) => ({
	type: MOVE_COLUMN, payload: { toMove, placeAfter },
});
