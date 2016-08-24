import { id } from 'ubc-farm-utils';
import { ADD_TASK, DELETE_TASK } from './actions.js';
import taskReducer from './reducer-single-task.js';

export function listReducer(state = new Map(), action) {
	let hasChanged = false;
	const nextState = new Map();
	for (const [key, previousStateForKey] of state) {
		const nextStateForKey = taskReducer(previousStateForKey, action);
		nextState.set(key, nextStateForKey);

		hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
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
