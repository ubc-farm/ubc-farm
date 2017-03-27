import { createStructuredSelector } from 'reselect';


const TRACK_FRESH_ADD = 'TRACK_FRESH_ADD';
const TRACK_MODIFIED_ADD = 'TRACK_MODIFIED_ADD';
const TRACK_DELETED_ADD = 'TRACK_DELETED_ADD';
const TRACKING_LISTS_CLEAR = 'TRACKING_LISTS_CLEAR';


const initialState = {
	freshList: new Set(),
	modifiedList: new Set(),
	deletedList: new Set(),
};

/**
 * Tracks fields that have client changes, before they are later synced to
 * the server.
 * @param {Set<string>} state.freshList - IDs of fields that have been added that are
 * not yet saved to the server.
 * @param {Set<string>} state.modifiedList - IDs of fields that have had changes
 * that are different from their server state. Never contains items in the
 * freshList or deletedList.
 * @param {Set<string>} state.deletedList - IDs of fields that have been
 * deleted on the client and need to be deleted on the server.
 * When a freshly added item is marked to be deleted, it is just removed
 * from the fresh list (since there is nothing on the server to delete).
 * When a modified item is marked to be deleted, it is moved from modifedList
 * to deletedList.
 */
export default function clientChangesReducer(state = initialState, action) {
	switch (action.type) {
		case TRACK_FRESH_ADD:
			return Object.assign({}, state, {
				freshList: new Set(state.freshList).add(action.payload),
			});
		case TRACK_MODIFIED_ADD: {
			const id = action.payload;
			if (state.freshList.has(id)) return state;
			return Object.assign({}, state, {
				modifiedList: new Set(state.modifiedList).add(id),
			});
		}
		case TRACK_DELETED_ADD: {
			const id = action.payload;
			let { freshList, modifiedList } = state;

			if (state.freshList.has(id)) {
				freshList = new Set(freshList);
				freshList.delete(id);
				return Object.assign({}, state, { freshList });
			}	else if (modifiedList.has(id)) {
				modifiedList = new Set(modifiedList);
				modifiedList.delete(id);
			}

			return Object.assign({}, state, {
				modifiedList,
				deletedList: new Set(state.deletedList).add(id),
			});
		}
		case TRACKING_LISTS_CLEAR:
			return Object.assign({}, state, {
				freshList: new Set(),
				modifiedList: new Set(),
				deletedList: new Set(),
			});

		default: return state;
	}
}


export const getClientChanges = createStructuredSelector({
	fresh: state => state.clientChanges.freshList,
	modified: state => state.clientChanges.modifiedList,
	deleted: state => state.clientChanges.deletedList,
});


export const markClientAddition =
	id => ({ type: TRACK_FRESH_ADD, payload: id });
export const markClientModification =
	id => ({ type: TRACK_MODIFIED_ADD, payload: id });
export const markClientDeletion =
	id => ({ type: TRACK_DELETED_ADD, payload: id });
export const clearClientChanges = () => ({ type: TRACKING_LISTS_CLEAR });
