import { SET_SELECTED_TASK } from '../actions/index.js';

const defaultState = { value: undefined, meta: undefined };

export default function selectedTask(state = defaultState, action) {
	if (action.type !== SET_SELECTED_TASK) return state;

	return { value: action.payload, meta: action.meta };
}
