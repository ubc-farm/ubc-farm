const SET_SORT_COLUMN = 'directory/sort/SET_SORT_COLUMN';
const TOGGLE_SORT_DIRECTION = 'directory/sort/TOGGLE_SORT_DIRECTION';

const defaultState = { column: null, direction: 'desc' };

// Reducer
export default function people(state = defaultState, action = {}) {
	switch (action.type) {
		case SET_SORT_COLUMN:
			if (state.column === action.payload) {
				const newDir = state.direction === 'desc' ? 'asc' : 'desc';
				return { column: state.column, direction: newDir };
			}
			return { column: action.payload, direction: 'desc' };
		case TOGGLE_SORT_DIRECTION: {
			const newDir = state.direction === 'desc' ? 'asc' : 'desc';
			return { column: state.column, direction: newDir };
		}

		default: return state;
	}
}


// Selectors
export const getSortColumn = store => store.sort.column;
export const getSortDirection = store => store.sort.direction;


// Actions
export const setSortColumn = column => ({ type: SET_SORT_COLUMN, payload: column });
export const clearSortColumn = () => ({ type: SET_SORT_COLUMN, payload: null });
export const toggleSortDirection = () => ({ type: TOGGLE_SORT_DIRECTION });
