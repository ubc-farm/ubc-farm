const SET = 'planning/selected/SET';
const TOGGLE = 'planning/selected/TOGGLE';
const CLEAR = 'planning/selected/CLEAR';

export default function selectedReducer(state = [], action) {
	switch (action.type) {
		case SET:
			return action.payload;
		case TOGGLE: {
			const selected = new Set(state);
			const id = action.payload;
			if (state.has(id)) selected.delete(id);
			else selected.add(id);
			return [...selected];
		}
		case CLEAR:
			return [];
		default:
			return state;
	}
}

export const setSelected = ids => ({ type: SET, payload: ids });
export const toggleSelected = id => ({ type: TOGGLE, payload: id });
export const clearSelected = () => ({ type: CLEAR });

export const getAllSelected = state => state.selected;
export const getSelected = state => state.selected[0] || null;
