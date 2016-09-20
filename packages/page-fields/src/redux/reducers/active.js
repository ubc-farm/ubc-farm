import { SET_ACTIVE } from '../actions/index.js';

/**
 * Creates a reducer function that stores a string value
 * returned from an action.
 * @param {any} actionType - type of action to check for
 * @param {function} [actionSelector] - function that returns the string
 * from an action - defaults to retriving action.payload
 * @param {string} [defaultState=''] - the default state for the function
 * @returns {function} reducer function
 */
export function createStringReducer(
	actionType,
	actionSelector = action => action.payload,
	defaultState = ''
) {
	return function stringReducer(state = defaultState, action) {
		if (action.type === actionType) return actionSelector(action);
		return state;
	};
}

export default createStringReducer(SET_ACTIVE);
