import { arrayRemove, arrayPush, arrayRemoveAll } from 'redux-form';
import { selected, allSelected } from '../selectors.js';
import { sortRows, selectNone } from './index.js';

export function addBlankRow() {
	return dispatch => {
		dispatch(arrayPush('invoice', 'rows', {}));
		dispatch(sortRows());
	};
}

export function deleteSelectedRows() {
	return (dispatch, getState) => {
		if (allSelected(getState())) {
			dispatch(arrayRemoveAll());
			dispatch(selectNone());
			return;
		}

		let deletedCount = 0;
		const selectedList = Array.from(selected(getState())).sort((a, b) => b - a);
		for (const index of selectedList) {
			dispatch(arrayRemove('invoice', 'rows', index - deletedCount));
			deletedCount++;
		}

		dispatch(selectNone());
		dispatch(sortRows());
	};
}
