import {} from './actions.js';

export default function loading(state = {}, action) {
	const setState = newState => Object.assign({}, state, newState);
	switch (action.type) {
		default: return state;
	}
}
