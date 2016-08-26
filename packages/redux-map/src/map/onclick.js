/* global google */
import { observeStore } from 'ubc-farm-utils';
import { fieldStyle } from 'ubc-farm-page-fields/src/map/index.js';
import { data as mapData } from './map.js';

import store from '../redux/index.js';
import { setSelectedLocation } from '../redux/actions/index.js';
import { selectedTaskObject } from '../redux/selectors.js';

function onClick({ feature }) {
	const id = feature.getId();

	store.dispatch(setSelectedLocation(id));
}

function updateSelectedItem(newSelected, oldSelected) {
	let next;
	let last;

	if (newSelected && newSelected.locationId) {
		next = mapData.getFeatureById(newSelected.locationId);
	}

	if (oldSelected && oldSelected.locationId) {
		last = mapData.getFeatureById(oldSelected.locationId);
	}

	if (next) {
		let style;
		switch (next.getGeometry().getType()) {
			case 'Polygon': style = fieldStyle.selected; break;
			case 'Point': style = null; break; // TODO: Add marker style
			default: style = null; break;
		}

		if (style != null) mapData.overrideStyle(next, style);
	}
	if (last && last !== next) mapData.revertStyle(next);
}

export default function observeClickAndStore() {
	const unsub = observeStore(store, selectedTaskObject,	updateSelectedItem);
	const onclick = google.maps.event.addListener(mapData, 'click', onClick);

	return function unsubscribe() {
		unsub();
		onclick.remove();
	};
}
