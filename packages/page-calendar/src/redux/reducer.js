import {SET_VIEWING} from './actions.js';

const defaultState = {
	viewingDate: new Date(),
	today: new Date()
}

export default function calendarApp(state = defaultState, action) {
	const setState = (...args) => Object.assign({}, state, ...args);
	switch (action.type) {
		case SET_VIEWING: return setState({viewingDate: action.viewingDate});
		default: return state;
	}
}