const DELETE_DOC = 'database-utils/DELETE-DOC';
const INSERT_DOC = 'database-utils/INSERT-DOC';
const UPDATE_DOC = 'database-utils/UPDATE-DOC';

/**
 * Binary search function for state.
 * @see https://pouchdb.com/2015/02/28/efficiently-managing-ui-state-in-pouchdb.html
 * @param {Array<T>} array
 * @param {T} docId
 * @returns {number}
 */
function binarySearch(array, docId) {
	let low = 0;
	let high = array.length;
	let mid;

	while (low < high) {
		mid = (low + high) >>> 1;
		if (array[mid]._id < docId) low = mid + 1;
		else high = mid;
	}
	return low;
}

function dataReducer(state = [], action) {
	switch (action.type) {
		case DELETE_DOC: {
			const id = action.payload._id;
			const index = binarySearch(state, id);
			const doc = state[index];

			if (doc && doc._id === id) {
				const stateCopy = state.slice(0);
				stateCopy.splice(index, 1);
				return stateCopy;
			} else {
				return state;
			}
		}

		case INSERT_DOC:
		case UPDATE_DOC: {
			const newDoc = action.payload;
			const index = binarySearch(state, newDoc._id);
			const doc = state[index];

			const stateCopy = state.slice(0);
			if (doc && doc._id === newDoc._id) {
				// update
				stateCopy[index] = doc;
			} else {
				// insert
				stateCopy.splice(index, 0, newDoc);
			}
			return stateCopy;
		}

		default:
			return state;
	}
}

export default function rootReducer(state = { data: [] }, action) {
	const newData = dataReducer(state.data, action);
	if (newData === state.data) return state;
	else return { data: newData };
}

export function deleteDoc(doc) {
	return { type: DELETE_DOC, payload: doc };
}
export function updateDoc(doc) {
	return { type: UPDATE_DOC, payload: doc };
}
export function insertDoc(doc) {
	return { type: INSERT_DOC, payload: doc };
}
