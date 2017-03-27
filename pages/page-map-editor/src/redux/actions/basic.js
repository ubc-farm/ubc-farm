export { SET_SELECTED, setSelected } from 'ubc-farm-page-fields/src/redux/actions.js';

export const OVERWRITE_CELLS = 'OVERWRITE_CELLS';

export const ADD_MODE = 'ADD_MODE';
export const SET_RESIZING = 'SET_RESIZING';

export const SET_LOADING = 'SET_LOADING';
export const APPLY_GRID_DATA = 'APPLY_GRID_DATA';

/** Used to load a new grid onto the map, for the given parent field */
export function overwriteCells(parent, payload, error) {
	return { type: OVERWRITE_CELLS, payload, error, meta: parent };
}

/** Set the grid property for a field */
export function applyGridData(toField, grid) {
	return { type: APPLY_GRID_DATA, payload: grid, meta: toField };
}

/** Sets the loading state for the given field */
export function setDataLoading(forField, isLoading) {
	return { type: SET_LOADING, payload: isLoading, meta: forField };
}


/** Set the field to be resized. Call with no args to clear. */
export function resizeField(id = '') {
	return { type: SET_RESIZING, payload: id };
}

/** If true, the user can draw on the map. */
export function addingMode(state) {
	return { type: ADD_MODE, payload: state };
}
