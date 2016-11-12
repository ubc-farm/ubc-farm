const TOGGLE = 'inventory/selected/TOGGLE';

export default function selectedReducer(state = null, action = {}) {
	switch (action.type) {
		case TOGGLE:
			return action.payload === state ? null : action.payload;

		default: return state;
	}
}


/** @returns {Set} selected rpw IDs */
export const getSelected = store => store.selected;
/** @returns {boolean} is the row selected */
export const isSelected = (store, id) => getSelected(store) === id;
/** @returns {boolean} is any row selected */
export const anySelected = store => getSelected(store) !== null;


export const toggle = row => ({ type: TOGGLE, payload: row });
