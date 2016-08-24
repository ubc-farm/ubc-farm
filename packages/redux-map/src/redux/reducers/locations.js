import { GET_LOCATIONS } from '../actions/index.js';

const entries = obj => Object.keys(obj).map(k => [k, obj[k]]);

export default function locations(state = new Map(), action) {
	if (action.type !== GET_LOCATIONS) return state;
	const { payload, error } = action;

	if (error) {
		console.error(payload);
		return state;
	}

	return new Map(entries(payload));
}
