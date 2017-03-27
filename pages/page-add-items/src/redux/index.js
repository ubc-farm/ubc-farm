import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import table from './table.js';
import selected from './selected.js';
import adding from './adding.js';

export default createStore(
	combineReducers({
		table,
		selected,
		adding,
	}),
	applyMiddleware(thunk),
);
