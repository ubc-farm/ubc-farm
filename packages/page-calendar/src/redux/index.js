import { createStore, combineReducers } from 'redux';
import currentDate from './currentDate.js';
import events from './events.js';

export const reducer = combineReducers({
	currentDate,
	events,
});

export default createStore(
	reducer,
);
