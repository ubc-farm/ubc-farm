import { Money } from '../../ubc-farm-utils/index.js';

import {
	selectedSelector, selectedLengthSelector,
	dataLengthSelector,
} from './selectors.js';

export const TOGGLE_SELECTION = 'TOGGLE_SELECTION';
export const SET_SELECTION = 'SET_SELECTION';
export const CLEAR_SELECTION = 'CLEAR_SELECTION';
export const EVERYTHING_SELECTION = 'EVERYTHING_SELECTION';

export const ADD_DATA_ROW = 'ADD_DATA_ROW';
export const REMOVE_DATA_ROWS = 'REMOVE_DATA_ROWS';
export const CHANGE_DATA = 'CHANGE_DATA';

export const SET_AMOUNT_PAID = 'SET_AMOUNT_PAID';

export function toggleRowSelection(rowId) {
	return { type: TOGGLE_SELECTION, payload: rowId };
}
export function setSelection(rowId, status) {
	return { type: SET_SELECTION, payload: status, meta: rowId };
}
export function selectNothing() {
	return { type: CLEAR_SELECTION };
}
export function selectEverything() {
	return { type: EVERYTHING_SELECTION };
}
export function toggleSelectAll() {
	return (dispatch, getState) => {
		const selectedSize = selectedLengthSelector(getState());
		const dataSize = dataLengthSelector(getState());

		if (selectedSize === dataSize) dispatch(selectNothing());
		else dispatch(selectEverything());
	};
}

export function addRow(rowData, rowId) {
	return { type: ADD_DATA_ROW, rowData, id: rowId };
}
export function removeRows(...rowIds) {
	const onlyOneParam = rowIds.length === 1;
	const [firstId] = rowIds;
	let rowIdList;

	if (onlyOneParam && firstId instanceof Set) rowIdList = firstId;
	else if (onlyOneParam && Array.isArray(firstId)) rowIdList = new Set(firstId);
	else rowIdList = new Set(rowIds);

	return { type: REMOVE_DATA_ROWS, ids: rowIdList };
}
export function removeSelected() {
	return (dispatch, getState) => {
		const selected = selectedSelector(getState());

		dispatch(removeRows(getState().selected));
		for (const id of selected) dispatch(setSelection(id, false));
	};
}
export function changeData(newValue, atRowKey, atColumn) {
	return { type: CHANGE_DATA, newValue, atRowKey, atColumn };
}

export function setAmountPaid(amount) {
	let amountPaid;
	if (typeof amount === 'string') {
		const strippedNonNumbers = amount.replace(/[^0-9\.]/g, '');
		amountPaid = new Money(strippedNonNumbers, { convert: false });
	} else if (!(amount instanceof Money)) {
		amountPaid = new Money(amount);
	}

	return { type: SET_AMOUNT_PAID, amountPaid };
}
