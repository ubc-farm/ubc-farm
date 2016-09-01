import { SORT_DIR, SORT_KEY } from './actions/index.js';

/**
 * Tracks selected rows as a set of indexes
 */
export default function sortInfo(
	state = { dir: 'down', key: undefined, map: [] },
	action
) {
	switch (action.type) {
		case SORT_DIR:
			return Object.assign({}, state, { dir: action.payload });

		case SORT_KEY:
			return Object.assign({}, state, { key: action.payload });

		default: return state;
	}
}
