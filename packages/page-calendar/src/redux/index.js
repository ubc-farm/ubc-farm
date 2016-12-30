import { createStore, combineReducers, applyMiddleware } from 'redux';
import PouchMiddleware from 'pouch-redux-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';

import currentView from './currentView.js';
import eventDB, { addEvent, editEvent, removeEvent } from './eventDB.js';

export const reducer = combineReducers({
	currentView,
	eventDB,
});

export default function configureStore(db) {
	const pouchMiddleware = PouchMiddleware({
		path: '/eventDB',
		db,
		actions: {
			insert: addEvent,
			remove: doc => removeEvent(doc._id),
			update: doc => editEvent(doc, doc._id),
		},
	});

	return createStore(
		reducer,
		composeWithDevTools(applyMiddleware(pouchMiddleware)),
	);
}
