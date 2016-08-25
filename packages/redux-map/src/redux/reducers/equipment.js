import { GET_EQUIPMENT } from '../actions/index.js';

const entries = obj => Object.keys(obj).map(k => [k, obj[k]]);

export default function equipment(state = new Map(), action) {
	if (action.type !== GET_EQUIPMENT) return state;
	const { payload, error } = action;

	if (error) {
		console.error(payload);
		return state;
	}

	return new Map(entries(payload));
}
