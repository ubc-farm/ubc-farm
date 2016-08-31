import { arrayRemove, arrayPush } from 'redux-form';
import { selected } from '../selectors.js';
import { calculateSortMap } from './index.js';

export function addBlankRow() {
	return dispatch => {
		dispatch(arrayPush('invoice', 'rows', {}));
		dispatch(calculateSortMap());
	};
}

export function deleteSelectedRows() {
	return (dispatch, getState) => {
		for (const index of selected(getState())) {
			dispatch(arrayRemove('invoice', 'rows', index));
		}
		dispatch(calculateSortMap());
	};
}
