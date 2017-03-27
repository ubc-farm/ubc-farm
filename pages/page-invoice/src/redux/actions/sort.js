import { sortInfo } from '../selectors.js';
import { sortRows } from './index.js';

export const SORT_DIR = 'SORT_DIR';
export const SORT_KEY = 'SORT_KEY';

export function setSortDir(direction, meta) {
	if (direction !== 'up' && direction !== 'down') {
		throw new TypeError(`Direction must be up or down, gave ${direction}`);
	}

	return { type: SORT_DIR, payload: direction, meta };
}

export function setSortKey(key) {
	return { type: SORT_KEY, payload: key };
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

		return dispatch(sortRows());
	};
}
