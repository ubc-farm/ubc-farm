import { createStore, combineReducers } from 'redux';

import selected from './selected.js';
import editor from './editor.js';

export default createStore(combineReducers({
	selected,
	editor,
}));
