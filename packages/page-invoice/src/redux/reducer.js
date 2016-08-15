import data from './reducer-data.js';
import amountPaid from './reducer-paid.js';
import selected from './reducer-selected.js';

// data MUST come before selected
const reducers = {
	data, 
	amountPaid, 
	selected
};

export default function combinedReducer(state = {}, action) {
	let hasChanged = false;
	let nextState = {};

	for (const key in reducers) {
		const reducer = reducers[key];
		const previousStateForKey = state[key];
		
		const thirdArg = key === 'selected'	? nextState.data : undefined;

		const nextStateForKey = reducer(previousStateForKey, action, thirdArg);

		if (nextStateForKey === undefined) {
			throw new Error(`Reducer ${key} returned undefined`);
		}
		nextState[key] = nextStateForKey;
		hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
	}
	return hasChanged ? nextState : state;
}