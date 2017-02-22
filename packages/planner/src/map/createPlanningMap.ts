import { createMap, observeDatabase } from '@ubc-farm/map-utils';

function diffLists(_ids: string[], _nextIds: string[]) {
	const ids = new Set(_ids);
	const nextIds = new Set(_nextIds);

	return {
		added: _nextIds.filter(id => !ids.has(id)),
		removed: _ids.filter(id => !nextIds.has(id)),
	};
}

function rowToFeature(doc) {
	if (!doc.geometry) return null;
	return {
		type: 'Feature',
		geometry: doc.geometry,
		id: doc._id,
		properties: { _rev: doc._rev, name: doc.name },
	};
}

function setProperty(datalayer, prop, value) {
	return (id) => {
		const feature = datalayer.getFeatureById(id);
		if (feature != null) feature.setProperty(prop, value);
	};
}

/**
 * Creates a Google Map and watches for updates from the field and place databases.
 * @param {PouchDB} fieldDB where rows include geometry property
 * @param {PouchDB} placeDB where rows include point property
 * @param {function} onClick function that is called when a feature is clicked
 * on the map. (id, feature) => void
 * @returns {function} setSelected function. Takes an ID and marks it as
 * selected on the map.
 */
export default function createPlanningMap(onClick, ...dbs) {
	const map = createMap();

	const observers = dbs.map(db => observeDatabase(db, map.data, rowToFeature));

	let lastSelected = [];
	function setSelected(ids) {
		const { added, removed } = diffLists(lastSelected, ids);
		if (added.length === 0 && removed.length === 0) return;

		removed.forEach(setProperty(map.data, 'selected', false));
		added.forEach(setProperty(map.data, 'selected', true));

		lastSelected = ids;
	}

	const listener = map.data.addListener('click', ({ feature }) => {
		const id = feature.getId();
		onClick(id, feature);
	});

	setSelected.removeListeners = () => {
		listener.remove();
		observers.forEach(observer => observer.then(o => o.cancel()));
	};

	return setSelected;
}
