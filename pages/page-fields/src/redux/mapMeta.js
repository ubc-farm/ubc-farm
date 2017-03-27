import { createSelector } from 'reselect';
import { getActive } from './active.js';


const EDITING_TOGGLE = 'EDITING_SETTER';
const ADDING_TOGGLE = 'ADDING_TOGGLE';
const LOAD_LIST_ADD = 'LOAD_LIST_ADD';
const LOAD_LIST_DELETE = 'LOAD_LIST_DELETE';


const initialState = {
	isEditing: false,
	isAdding: false,
	loadingList: new Set(),
};

/**
 * @param {bool} state.isEditing -  is the page in 'editing' mode?
 * @param {bool} state.isAdding - is the page in 'adding' (aka drawing a new field) mode?
 * @param {Set<string>} state.loadingList - IDs of fields that are currently loading new data
 */
export default function mapMetaReducer(state = initialState, action) {
	switch (action.type) {
		case EDITING_TOGGLE:
			return Object.assign({}, state, { isEditing: !state.isEditing });
		case ADDING_TOGGLE:
			return Object.assign({}, state, { isAdding: !state.isAdding });

		case LOAD_LIST_ADD:
			return Object.assign({}, state, {
				loadingList: new Set(state.loadingList).add(action.payload),
			});
		case LOAD_LIST_DELETE: {
			const loadingList = new Set(state.loadingList);
			loadingList.delete(action.payload);
			return Object.assign({}, state, { loadingList });
		}

		default: return state;
	}
}


export const getIsEditing = state => state.mapMeta.isEditing;
export const getIsAdding = state => state.mapMeta.isAdding;
export const getLoadingList = state => state.mapMeta.loadingList;
export const getActiveIsLoading = createSelector(
	getActive, getLoadingList,
	(active, loadingList) => loadingList.has(active)
);


export const toggleEditing = () => ({ type: EDITING_TOGGLE });
export const toggleAdding = () => ({ type: ADDING_TOGGLE });
export const markLoading = id => ({ type: LOAD_LIST_ADD, payload: id });
export const unmarkLoading = id => ({ type: LOAD_LIST_DELETE, payload: id });
