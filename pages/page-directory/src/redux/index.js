import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import PouchMiddleware from 'pouch-redux-middleware';

import people, { INSERT_PERSON, editPerson, deletePerson } from './people.js';
import sort from './sort.js';

const reducer = combineReducers({
	people,
	sort,
});

export default function configureStore(db) {
	const pouchMiddleware = PouchMiddleware({
		path: '/people',
		db,
		actions: {
			insert: doc => ({ type: INSERT_PERSON, payload: doc }),
			remove: doc => deletePerson(doc._id),
			update: doc => editPerson(doc, doc._id),
		},
	});

	const composeEnhancers =
		(typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
		|| compose;
	return createStore(
		reducer,
		composeEnhancers(applyMiddleware(pouchMiddleware)),
	);
}
