import {
	activeSelector,
	resizableSelector,
	addModeSelector,
} from '../selectors.js';

import { resizeField, addingMode } from './index.js';

/** Toggles resizing for the selected polygon */
export function toggleResizing() {
	return (dispatch, getState) => {
		const active = activeSelector(getState());
		const resizing = resizableSelector(getState());

		if (resizing === active) return dispatch(resizeField());

		return dispatch(resizeField(active));
	};
}

/** Toggles adding mode */
export function toggleAdding() {
	return (dispatch, getState) => {
		const addModeActive = addModeSelector(getState());
		dispatch(addingMode(!addModeActive));
	};
}
