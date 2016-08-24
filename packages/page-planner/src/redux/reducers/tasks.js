import { id } from 'ubc-farm-utils';
import { ADD_TASK, DELETE_TASK } from '../actions/index.js';
import taskReducer from './task-single.js';

export function listReducer(state = new Map(), action) {
	let hasChanged = false;
	let nextState = new Map();

	if (action.id) {
		const previousStateForKey = state.get(action.id);
		const newStateForKey = taskReducer(previousStateForKey, action);
		nextState = new Map(state).set(action.id, newStateForKey);
		hasChanged = true;
	} else {
		for (const [key, previousStateForKey] of state) {
			const nextStateForKey = taskReducer(previousStateForKey, action);
			nextState.set(key, nextStateForKey);

			hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
		}
	}

	return hasChanged ? nextState : state;
}

export default function taskList(state = new Map(), action) {
	switch (action.type) {
		case ADD_TASK: {
			const clone = new Map(state);
			const key = action.payload || id();

			const blank = taskReducer(undefined, action);
			if (action.meta) Object.assign(blank, action.meta);

			return clone.set(key, blank);
		}
		case DELETE_TASK: {
			const clone = new Map(state);
			clone.delete(action.payload);
			return clone;
		}
		default: return listReducer(state, action);
	}
}
