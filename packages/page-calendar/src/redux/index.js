import { createStore, combineReducers } from 'redux';
import currentView from './currentView.js';
import eventDB from './eventDB.js';

export const reducer = combineReducers({
	currentView,
	eventDB,
});

export default createStore(
	reducer,
);
