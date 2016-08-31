import PromiseWorker from 'promise-worker';
import { rowsSelector, sortInfo } from '../selectors.js';

export const SORT_DIR = 'SORT_DIR';
export const SORT_KEY = 'SORT_KEY';
export const SORT_MAP = 'SORT_MAP';

export function setSortDir(direction, meta) {
	if (direction !== 'up' && direction !== 'down') {
		throw new TypeError(`Direction must be up or down, gave ${direction}`);
	}

	return { type: SORT_DIR, payload: direction, meta };
}

export function setSortKey(key) {
	return { type: SORT_KEY, payload: key };
}

export function updateSortMap(payload, isError = false) {
	return { type: SORT_MAP, payload, error: isError };
}

const sorter = new PromiseWorker('/js/page/invoice/sort-worker.js');
export function calculateSortMap() {
	return (dispatch, getState) => {
		const { dir, key } = sortInfo(getState());
		const data = rowsSelector(getState());

		return sorter.postMessage({ dir, key, data })
			.then(map => {
				dispatch(updateSortMap(map, false));
				return map;
			})
			.catch(err => dispatch(updateSortMap(err, true)));
	};
}

export function changeSortTarget(targetKey) {
	return (dispatch, getState) => {
		const { key } = sortInfo(getState());

		if (key === targetKey) {
			const { dir } = sortInfo(getState());

			if (dir === 'down') dispatch(setSortDir('up'));
			else dispatch(setSortDir('down'));
		} else {
			dispatch(setSortDir('down'));
			dispatch(setSortKey(targetKey));
		}

		return dispatch(calculateSortMap());
	};
}

export function reSortOnChange(name) {
	return (dispatch, getState) => {
		const { key } = sortInfo(getState());
		const column = name.substring(name.lastIndexOf('.') + 1);

		if (column !== key) return;

		dispatch(calculateSortMap());
	};
}
