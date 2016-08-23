import { SET_RESIZING, ADD_MODE } from './actions.js';

export { default as active } from 'ubc-farm-page-fields/src/redux/reducer-active.js';

export function resizing(state = '', action) {
	if (action.type === SET_RESIZING) return action.payload;

	return state;
}

export function mapMeta(state = { adding: false }, action) {
	if (action.type === ADD_MODE) {
		return Object.assign({}, state, { adding: action.payload });
	}

	return state;
}
