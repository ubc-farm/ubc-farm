const CLEAR = 'planning/editor/CLEAR';
const SET_MODEL = 'planning/editor/SET_MODEL';
const SET_PROPERTY = 'planning/editor/SET_PROPERTY';

const defaultState = Object.freeze({
	_id: null,
	_rev: null,
	name: '',
	start: '',
	end: '',
	location: null,
	equipment: [],
});

export default function editorReducer(state = defaultState, action) {
	switch (action.type) {
		case CLEAR:
			return defaultState;
		case SET_MODEL:
			return action.payload;
		case SET_PROPERTY: {
			const { key, value } = action.payload;
			return Object.assign({}, state, { [key]: value });
		}
		default:
			return state;
	}
}

export const clearEditor = () => ({ type: CLEAR });
export const setEditorModel = model => ({ type: SET_MODEL, payload: model });
export const setEditorProp = (key, value) => ({
	type: SET_MODEL, payload: { key, value }
});

export const getModel = state => state.editor;
