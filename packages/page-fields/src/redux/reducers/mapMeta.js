import { SET_EDITING, SET_LOADING, ADD_MODE } from '../actions/index.js';

const shape = {
	editingActive: false,
	loadingList: new Set(),
	addingMode: false,
};

export default function mapMeta(state = shape, action) {
	switch (action.type) {
		case SET_EDITING:
			return Object.assign({}, shape, { editingActive: action.payload });

		case ADD_MODE:
			return Object.assign({}, shape, { addingMode: action.payload });

		case SET_LOADING: {
			const { target, isLoading } = action.payload;
			const newList = new Set(state.loadingList);

			if (!isLoading) newList.delete(target);
			else if (isLoading)	newList.add(target);

			return Object.assign({}, shape, { loadingList: newList });
		}

		default: return state;
	}
}
