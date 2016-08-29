/* global google */
import { observeStore } from 'ubc-farm-utils';
import { fieldStyle } from 'ubc-farm-page-fields/src/map/index.js';
import { data as mapData } from './map.js';

import store from '../redux/index.js';
import { setSelectedLocation } from '../redux/actions/index.js';
import { selectedLocation } from '../redux/selectors.js';

function onClick({ feature }) {
	const id = feature.getId();

	store.dispatch(setSelectedLocation(id));
}

const selectedIcon = {
	icon: 'http://mt.google.com/vt/icon?color=ff004C13&name=icons/spotlight/spotlight-waypoint-blue.png',
};

/**
 * @param {string} nextLocation
 * @param {string} lastLocation
 */
function updateSelectedItem(nextLocation, lastLocation) {
	const next = mapData.getFeatureById(nextLocation);

	if (lastLocation) {
		const last = mapData.getFeatureById(lastLocation);
		if (last && last !== next) mapData.revertStyle(last);
	}

	if (next) {
		let style;
		switch (next.getGeometry().getType()) {
			case 'Polygon': style = fieldStyle.selected; break;
			case 'Point': style = selectedIcon; break;
			default: style = null; break;
		}

		mapData.overrideStyle(next, style);
	}
}

export default function observeClickAndStore() {
	const unsub = observeStore(store, selectedLocation,	updateSelectedItem);
	const onclick = google.maps.event.addListener(mapData, 'click', onClick);

	return function unsubscribe() {
		unsub();
		onclick.remove();
	};
}
