/* global google */
import { activatePolygon } from '../../redux/actions/index.js';
import { isField } from '../utils/index.js';

/**
 * Listener for click event
 */
function handlePolygonClick(dispatch, { feature }) {
	if (isField(feature)) {
		const id = feature.getId();
		dispatch(activatePolygon(id));
	}
}

/**
 * @param {google.maps.Data} mapData
 * @param {Store} store
 * @returns {function} invoke function to remove listener
 */
export default function createListener(store, mapData) {
	const clickListener = google.maps.event.addListener(
		mapData, 'click',
		handlePolygonClick.bind(undefined, store.dispatch)
	);

	return clickListener.remove;
}
