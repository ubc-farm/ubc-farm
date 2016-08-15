import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk'

import reducer from './reducer.js';

export default createStore(
	combineReducers({
		fixme: reducer //TODO
	}),
	undefined,
	compose(
		applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)
);