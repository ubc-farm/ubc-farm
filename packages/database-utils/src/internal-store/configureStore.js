import PouchMiddleware from 'pouch-redux-middleware';
import { createStore, applyMiddleware } from 'redux';
import rootReducer, { deleteDoc, insertDoc, updateDoc } from './reducer.js';

export default function configureStore(db, {
	changeFilter,
	handleResponse,
	initialBatchDispatched,
} = {}) {
	const middlewarePath = {
		path: '/data',
		db,
		actions: {
			remove: deleteDoc,
			insert: insertDoc,
			update: updateDoc,
		},
	};

	if (changeFilter) middlewarePath.changeFilter = changeFilter;
	if (handleResponse) {
		middlewarePath.handleResponse = (error, data, callback) => {
			Promise.resolve(handleResponse(error, data))
			.then(() => callback(), callback);
		};
	}
	if (initialBatchDispatched) middlewarePath.initialBatchDispatched = initialBatchDispatched;

	const store = createStore(
		rootReducer,
		undefined,
		applyMiddleware(PouchMiddleware(middlewarePath)),
	);

	return store;
}
