import { SORT_DIR, SORT_KEY, SORT_MAP } from './actions/index.js';

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

		case SORT_MAP: {
			const { payload, error } = action;
			if (error) throw payload;

			const newState = Object.assign({}, state, { map: payload });
			const oldMap = state.map;

			if (payload.length !== oldMap.length
			|| payload.some((value, index) => value !== oldMap[index])) {
				return newState;
			}

			return state;
		}

		default: return state;
	}
}
