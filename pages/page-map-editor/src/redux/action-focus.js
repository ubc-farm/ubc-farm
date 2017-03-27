import {setSelected, initializeForm} from './actions.js';
import buildGrid from './action-build-grid.js';

export default function focusPolygon(id) {
	return dispatch => {
		dispatch(setSelected(id));
		dispatch(buildGrid(id));
		dispatch(initializeForm());
	}
}