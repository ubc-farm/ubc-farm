import { combineReducers } from 'redux';

import active from './active.js';
import mapMeta from './mapMeta.js';

export default combineReducers({
	active,
	mapMeta,
});
