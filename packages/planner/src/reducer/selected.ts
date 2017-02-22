const SET = 'planning/selected/SET';
const TOGGLE = 'planning/selected/TOGGLE';
const CLEAR = 'planning/selected/CLEAR';

export type IState = string[];

export default function selectedReducer(state: IState = [], action) {
	switch (action.type) {
		case SET:
			return action.payload;
		case TOGGLE: {
			const selected = new Set(state);
			const id = action.payload;
			if (selected.has(id)) selected.delete(id);
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

export const getAllSelected = state => <IState> state.selected;
export const getSelected = state => <string> state.selected[0] || null;
export const isAnySelected = state => state.selected.length !== 0;
