import {id as randomId} from 'ubc-farm-utils';

import columnList from '../columnlist.js';
import {
	ADD_DATA_ROW, REMOVE_DATA_ROWS, CHANGE_DATA,
} from './actions.js';

export default function data(state = new Map(), action) {
	switch (action.type) {
		case ADD_DATA_ROW: {
			const {id = randomId(), rowData = new WeakMap()} = action;
			const data = new Map(state).set(id, rowData);
			return data;
		}
		case REMOVE_DATA_ROWS: {
			const {ids = new Set()} = action;
			let data = new Map();
			for (const [id, row] of state) 
				if (!ids.has(id)) data.set(id, row);
			return data;
		}
		case CHANGE_DATA: {
			const {atRowKey, atColumn, newValue} = action;
			let data = new Map(state), newRow = new WeakMap();
			const oldRow = data.get(atRowKey);

			newRow.set(atColumn, newValue);
			for (const col of columnList) {
				if (oldRow.has(col) && col !== atColumn) {
					newRow.set(col, oldRow.get(col));
				}
			}

			data.set(atRowKey, newRow);
			return data;
		}

		default: return state;
	}
}