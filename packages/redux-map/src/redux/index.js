import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import selected from './reducers/selected.js';
import locations from './reducers/locations.js';
import equipment from './reducers/equipment.js';
import tasks from './reducers/tasks.js';

export default createStore(
	combineReducers({
		locations,
		equipment,
		tasks,
		selected,
	}),
	undefined,
	compose(
		applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)
);
