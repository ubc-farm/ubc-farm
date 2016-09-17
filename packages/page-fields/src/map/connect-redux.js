import { observeStore } from 'ubc-farm-utils';

/** @type {string} used to identify the active field in the map */
export let activeProp = 'activeField'; // eslint-disable-line

/**
 * Updates the polygons on the map by setting the 'activeField'
 * property on the current selected polygon for the store.
 * @param {string} newActive - ID of the polygon that is now active
 * @param {string} lastActive - ID of the polygon that was
 * previously marked active
 * @this {google.maps.Data} map.data class
 */
function updateActive(newActive, lastActive) {
	const last = this.getFeatureById(lastActive);
	const next = this.getFeatureById(newActive);

	if (last) last.removeProperty(activeProp);
	if (next) next.setProperty(activeProp, true);
}

/**
 * Connects the given map data object to a redux store.
 * Click events are passed as setSelected actions,
 * and updates to the active state are reflected in the map.
 * @param {google.maps.Data} mapData
 * @param {Store} store
 * @returns {Function[]} invoke both functions to remove listeners
 */
export default function connectToStore(mapData, store, selector, clickAction) {
	const { dispatch } = store;
	const listener = mapData.addListener('click',
		({ feature }) => dispatch(clickAction(feature.getId()))
	);

	const unsubscribe =
		observeStore(store, selector, updateActive.bind(mapData));

	return [
		unsubscribe,
		listener.remove,
	];
}
