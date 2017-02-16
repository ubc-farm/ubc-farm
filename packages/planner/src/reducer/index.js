import { createStore, combineReducers } from 'redux';

import selected from './selected.js';
import editor from './editor.js';

export default createStore(
	combineReducers({
		selected,
		editor,
	}),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
