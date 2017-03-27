import { Task } from '@ubc-farm/databases';

const CLEAR = 'planning/editor/CLEAR';
const SET_MODEL = 'planning/editor/SET_MODEL';
const SET_PROPERTY = 'planning/editor/SET_PROPERTY';

export type IState = Task;

const defaultState = {
	_id: '',
	_rev: '',
	type: '',
	name: '',
	start: undefined,
	end: undefined,
	location: '',
	equipment: [],
};

export default function editorReducer(state: IState = defaultState, action: any) {
	switch (action.type) {
		case CLEAR:
			return defaultState;
		case SET_MODEL:
			return action.payload;
		case SET_PROPERTY: {
			const { key, value } = action.payload;
			const newState = Object.assign({}, state);
			newState[key] = value;
			return newState;
		}
		default:
			return state;
	}
}

export const clearEditor = () => ({ type: CLEAR });
export const setEditorModel = (model: IState) => ({ type: SET_MODEL, payload: model });
export function setEditorProp<K extends keyof IState>(key: K, value: IState[K]) {
	return { type: SET_PROPERTY, payload: { key, value } };
}

export const getModel = (state: { editor: IState }) => state.editor;
