import { SORT_DIR, SORT_KEY, SORT_MAP } from './actions/index.js';

/**
 * Tracks selected rows as a set of indexes
 */
export default function sortInfo(
	state = { dir: 'down', key: undefined, map: new Map() },
	action
) {
	switch (action.type) {
		case SORT_DIR:
			return Object.assign({}, state, { dir: action.payload });

		case SORT_KEY:
			return Object.assign({}, state, { key: action.payload });

		case SORT_MAP: {
			const { payload, error } = action;
			if (error) throw payload;

			return Object.assign({}, state, { map: new Map(payload)	});
		}

		default: return state;
	}
}
