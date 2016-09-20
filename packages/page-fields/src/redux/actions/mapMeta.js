import { addingModeSelector } from '../selectors/index.js';

export const SET_EDITING = 'SET_EDITING';
export const SET_LOADING = 'SET_LOADING';
export const ADD_MODE = 'ADD_MODE';

export const setEditing = bool => ({ type: SET_EDITING, payload: bool });
export const setAddingMode = bool => ({ type: ADD_MODE, payload: bool });

export const addLoading =
	target => ({ type: SET_LOADING, payload: { target, isLoading: true } });
export const removeLoading =
	target => ({ type: SET_LOADING, payload: { target, isLoading: false } });

export function toggleAddingMode() {
	return (dispatch, getState) =>
		dispatch(setAddingMode(!addingModeSelector(getState())));
}
