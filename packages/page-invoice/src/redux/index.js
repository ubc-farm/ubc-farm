import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { reducer as form } from 'redux-form';
import selected from './reducer-selected.js';

export default createStore(
	combineReducers({
		selected,
		form,
	}),
	undefined,
	compose(
		applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)
);
