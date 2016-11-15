import { createStore, applyMiddleware, combinerReducers } from 'redux';
import thunk from 'redux-thunk';

import table from './table.js';
import selected from './selected.js';

export default createStore(
	combinerReducers({
		table,
		selected,
	}),
	applyMiddleware(thunk),
);
