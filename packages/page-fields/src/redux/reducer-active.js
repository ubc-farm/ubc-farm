import {SET_SELECTED} from './actions.js';

export default function selected(state = '', action) {
	if (action.type === SET_SELECTED) return action.payload || '';
	else return state;
}