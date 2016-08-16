import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk'

import {active, resizing, mapMeta} from './reducer-simple.js';
import grids from './reducer-gridform.js';
import cells from './reducer-cells.js';
import loading from './reducer-loading.js';

export default createStore(
	combineReducers({
		active, 
		resizing, 
		mapMeta, 
		loading, 
		grids, 
		cells 
	}),
	undefined,
	compose(
		applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)
);