import { id as randomId } from 'ubc-farm-utils';

import columnList from '../columnlist.js';
import {
	ADD_DATA_ROW, REMOVE_DATA_ROWS, CHANGE_DATA,
} from './actions.js';

export default function data(state = new Map(), action) {
	switch (action.type) {
		case ADD_DATA_ROW: {
			const { id = randomId(), rowData = new WeakMap() } = action;
			const newData = new Map(state).set(id, rowData);
			return newData;
		}
		case REMOVE_DATA_ROWS: {
			const { ids = new Set() } = action;
			const newData = new Map();
			for (const [id, row] of state) {
				if (!ids.has(id)) newData.set(id, row);
			}
			return newData;
		}
		case CHANGE_DATA: {
			const { atRowKey, atColumn, newValue } = action;
			const newData = new Map(state);

			const newRow = new WeakMap();
			const oldRow = newData.get(atRowKey);

			newRow.set(atColumn, newValue);
			for (const col of columnList) {
				if (oldRow.has(col) && col !== atColumn) {
					newRow.set(col, oldRow.get(col));
				}
			}

			newData.set(atRowKey, newRow);
			return newData;
		}

		default: return state;
	}
}
