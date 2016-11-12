import { getSelected } from './selected.js';

const INIT = 'inventory/table/INIT';
const ADD_ROW = 'inventory/table/ADD_ROW';
const DELETE_ROW = 'inventory/table/DELETE_ROW';
const EDIT_ROW = 'inventory/table/EDIT_ROW';

export default function tableReducer(state = [], action = {}) {
	switch (action.type) {
		case INIT:
			return action.payload;

		case ADD_ROW:
			return [...state, action.payload];

		case DELETE_ROW: {
			const copy = state.slice(0);
			copy.splice(action.index, 1);
			return copy;
		}

		case EDIT_ROW: {
			const copy = state.slice(0);
			copy[action.index] = action.payload;
			return copy;
		}

		default:
			return state;
	}
}


/** @returns {Array<Object>} table data */
export const getTable = store => store.table;
/** @returns {Array} one column from the table */
export const getColumn = (store, field) => store.table.map(row => row[field]);


/** Sets the table to a blank slate with the given data */
export const setTable = data => ({ type: INIT, payload: data });
/** Adds a new row to the table */
export const addRow = newRow => ({ type: ADD_ROW, payload: newRow });
/** Deletes a row from the table */
export const deleteRow = index => ({ type: DELETE_ROW, index });
/** Replace a row in the table */
export const editRow = (index, row) => ({ type: EDIT_ROW, index, payload: row });

export function deleteSelected() {
	return (dispatch, getState) => {
		const id = getSelected(getState());
		const selectedIndex = getTable(getState()).findIndex(row => row.id === id);

		return dispatch(deleteRow(selectedIndex));
	}
}
