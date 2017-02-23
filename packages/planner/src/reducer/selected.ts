const SET = 'planning/selected/SET';
const TOGGLE = 'planning/selected/TOGGLE';
const CLEAR = 'planning/selected/CLEAR';

export type IState = string[];
interface FullState { selected: IState };

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

export const setSelected = (ids: IState) => ({ type: SET, payload: ids });
export const toggleSelected = (id: string) => ({ type: TOGGLE, payload: id });
export const clearSelected = () => ({ type: CLEAR });

export const getAllSelected = (state: FullState) => <IState> state.selected;
export const getSelected = (state: FullState) => <string> state.selected[0] || null;
export const isAnySelected = (state: FullState) => state.selected.length !== 0;
