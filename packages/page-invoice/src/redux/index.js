import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk'
import invoiceApp from './reducer.js';

export default createStore(
	invoiceApp,
	undefined,
	compose(
		applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)
);