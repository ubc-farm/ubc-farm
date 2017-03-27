import { activeSelector } from '../selectors.js';
import { applyGridData } from './index.js';

/** Toggles resizing for the selected polygon */
export default function applyGridDataToActive(data) {
	return (dispatch, getState) => {
		const active = activeSelector(getState());
		return dispatch(applyGridData(active, data));
	};
}
