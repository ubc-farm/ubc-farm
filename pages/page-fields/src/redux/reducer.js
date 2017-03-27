import { combineReducers } from 'redux';

import active from './active.js';
import mapMeta from './mapMeta.js';
import clientChanges from './clientChanges.js';

export default combineReducers({
	active,
	mapMeta,
	clientChanges,
});
