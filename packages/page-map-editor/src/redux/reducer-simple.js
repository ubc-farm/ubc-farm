import {SET_RESIZING, ADD_MODE} from './actions.js'

export {default as active} from 'ubc-farm-page-fields/redux/reducer-active.js';

export function resizing(state = '', action) {
	if (action.type === SET_RESIZING) return action.payload;
	else return state;
}

export function mapMeta(state = {adding: false}, action) {
	const setState = source => Object.assign({}, state, source);

	if (action.type === ADD_MODE) return setState({ adding: action.payload });
	else return state;
}