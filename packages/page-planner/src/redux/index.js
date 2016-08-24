import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import locations from './reducer-locations.js';
import tasks from './reducer-tasks.js';

export default createStore(
	combineReducers({
		locations,
		tasks,
	}),
	undefined,
	compose(
		applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)
);
