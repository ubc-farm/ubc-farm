import createMap from '@ubc-farm/fields/src/googlemaps/createMap.js';
import observeDatabase from '@ubc-farm/fields/src/googlemaps/observeDatabase.js';

/**
 * Creates a Google Map and watches for updates from the field and place databases.
 * @param {PouchDB} fieldDB where rows include geometry property
 * @param {PouchDB} placeDB where rows include point property
 * @param {function} onClick function that is called when a feature is clicked
 * on the map. (id, feature) => void
 * @returns {function} setSelected function. Takes an ID and marks it as
 * selected on the map.
 */
export default function createPlanningMap(fieldDB, placeDB, onClick) {
	const map = createMap();

	const fieldChanges = observeDatabase(fieldDB, map.data, (doc) => {
		if (!doc.geometry) return null;
		return {
			type: 'Feature',
			geometry: doc.geometry,
			id: doc._id,
			properties: { _rev: doc._rev },
		};
	});
	const placeChanges = observeDatabase(fieldDB, map.data, (doc) => {
		if (!doc.point) return null;
		return {
			type: 'Feature',
			geometry: { type: 'Point', coordinates: doc.point },
			id: doc._id,
			properties: { _rev: doc._rev, name: doc.name },
		};
	});

	let lastSelected;
	function setSelected(id) {
		if (id === lastSelected) return;

		const lastFeature = map.data.getFeatureById(lastSelected);
		if (lastFeature != null) lastFeature.setProperty('selected', false);

		const selectedFeature = map.data.getFeatureById(id);
		if (selectedFeature != null) selectedFeature.setProperty('selected', true);

		lastSelected = id;
	}

	const listener = map.data.addListener('click', ({ feature }) => {
		const id = feature.getId();
		onClick(id, feature);
	});

	setSelected.removeListeners = () => {
		listener.remove();
		fieldChanges.then(changes => changes.cancel());
		placeChanges.then(changes => changes.cancel());
	};

	return setSelected;
}
