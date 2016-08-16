import {SET_LOADING} from './actions.js'

export default function loading(state = new Set(), action) {
	if (action.type === SET_LOADING) {
		const {payload: isLoading, meta: target} = action;
		let clone = new Set(state);

		if (!isLoading) 
			clone.delete(target); 
		else if (isLoading)
			clone.add(target);

		return clone;
	} else {
		return state;
	}
}