/* global google */
import { id as randomID } from 'ubc-farm-utils';

import { setSelected, addingMode } from '../redux/actions.js';
import buildGrid from '../redux/action-build-grid.js';

import { isField, isNewlyDrawn } from './filter.js';
import toGeoJson from './promise-tojson.js';
import defaultGrid from './grid-default.js';

/**
 * Listener for click event
 */
function handlePolygonClick(dispatch, { feature }) {
	if (isField(feature)) {
		const id = feature.getId();
		dispatch(setSelected(id));
		dispatch(buildGrid(id));
	}
}

/**
 * Recreates a Data.Feature on the given map.data
 * with the desired ID and properties.
 * Features need to be rebuilt to assign IDs to them.
 * @returns {Promise<google.maps.Data.Feature>}
 */
function rebuildFeature(mapData, feature, newId, newProperties) {
	return toGeoJson(feature).then(featureGeoJson => {
		const newFeature = Object.assign({}, featureGeoJson, {
			id: newId,
			properties: {},
		});

		Object.assign(newFeature.properties, newProperties);

		mapData.remove(feature);
		return mapData.addGeoJson(newFeature);
	});
}

/**
 * Listener for addfeature event
 * @this {google.maps.Data}
 */
function handlePolygonAdd(dispatch, { feature }) {
	if (isNewlyDrawn(feature)) {
		dispatch(addingMode(false));
		const id = randomID();
		const properties = {
			parent: null,
			grid: defaultGrid,
		};

		rebuildFeature(this, feature, id, properties)
		.then(() => {
			dispatch(setSelected(id));
			dispatch(buildGrid(id));
		});
	}
}

/**
 * @param {google.maps.Data} mapData
 * @param {Store} store
 * @returns {function[]} invoke both functions to remove listeners
 */
export default function createListeners(store, mapData) {
	const addListener = google.maps.event.addListener(
		mapData, 'addfeature',
		handlePolygonAdd.bind(mapData, store.dispatch)
	);

	const clickListener = google.maps.event.addListener(
		mapData, 'click',
		handlePolygonClick.bind(mapData, store.dispatch)
	);

	return [addListener.remove, clickListener.remove];
}
