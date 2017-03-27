import { GET_ITEMLIST } from './actions/index.js';

export default function itemlist(
	state = { list: 'itemlist', data: [] }, action
) {
	if (action.type !== GET_ITEMLIST) return state;
	const { payload, error } = action;

	if (error) {
		console.error(payload);
		return state;
	}

	return Object.assign({}, state, {
		data: Object.keys(payload).map(k => payload[k]),
	});
}
