const SET = 'planning/selected/SET';
const CLEAR = 'planning/selected/CLEAR';

export default function selectedReducer(state = [], action) {
	switch (action.type) {
		case SET:
			return action.payload;
		case CLEAR:
			return [];
		default:
			return state;
	}
}

export const setSelected = ids => ({ type: SET, payload: ids });
export const clearSelected = () => ({ type: CLEAR });

export const getAllSelected = state => state.selected;
export const getSelected = state => state.selected[0] || null;
