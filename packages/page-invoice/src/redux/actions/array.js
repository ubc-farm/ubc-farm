import { arrayRemove, arrayPush } from 'redux-form';
import { selected } from '../selectors.js';

export function addBlankRow() {
	return arrayPush('invoice', 'rows', {});
}

export function deleteSelectedRows() {
	return (dispatch, getState) => {
		for (const index of selected(getState())) {
			dispatch(arrayRemove('invoice', 'rows', index));
		}
	};
}
