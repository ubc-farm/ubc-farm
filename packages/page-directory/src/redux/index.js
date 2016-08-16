import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk'
import {reducer as form} from 'redux-form';

//import reducer from './reducer.js';

export default createStore(
	combineReducers({
		form
	}),
	undefined,
	compose(
		applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)
);