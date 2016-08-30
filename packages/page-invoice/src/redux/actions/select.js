import {
	selected,
	selectedLength,
	rowsLength,
} from '../selectors.js';

export const ADD_SELECTION = 'ADD_SELECTION';
export const REMOVE_SELECTION = 'REMOVE_SELECTION';

export function addSelection(...ids) {
	return { type: ADD_SELECTION, payload: ids };
}
export function removeSelection(...ids) {
	return { type: REMOVE_SELECTION, payload: ids };
}

export function toggleSelection(id) {
	return (dispatch, getState) => {
		const hasId = selected(getState()).has(id);
		const action = hasId ? removeSelection : addSelection;

		return dispatch(action(id));
	};
}

export function selectNone() {
	return (dispatch, getState) => {
		const selectedIds = selected(getState());
		dispatch(removeSelection(...selectedIds));
	};
}

export function selectAll() {
	return (dispatch, getState) => {
		const length = rowsLength(getState());
		const oToNArray = Reflect.apply(Array, null, { length })
			.map(Number.call, Number);
		dispatch(addSelection(...oToNArray));
	};
}

export function toggleSelectAll() {
	return (dispatch, getState) => {
		const selectedSize = selectedLength(getState());
		const dataSize = rowsLength(getState());

		if (selectedSize === dataSize) dispatch(selectNone());
		else dispatch(selectAll());
	};
}
