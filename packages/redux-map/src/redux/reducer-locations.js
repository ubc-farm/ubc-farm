import { GET_LOCATIONS } from './actions.js';

export default function locations(state = new Map(), action) {
	if (action.type !== GET_LOCATIONS) return state;
	const { payload, error } = action;

	if (error) {
		console.error(payload);
		return state;
	}

	const newState = new Map();
	for (const key in payload) {
		if (Object.prototype.hasOwnProperty.call(payload, key)) {
			newState.set(key, payload[key]);
		}
	}

	return newState;
}
