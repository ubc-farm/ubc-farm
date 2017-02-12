/**
 * Observes a PouchDB database and adds any new documents to the Google Map
 * data layer, or deleted them if removed.
 * @param {PouchDB} db
 * @param {google.maps.Data} mapDataLayer
 * @param {function} docToFeature (Object) => GeoJSON.Feature
 * @returns {Promise<EventEmitter>} returns changes emitter.
 */
export default async function observeDatabase(db, mapDataLayer, docToFeature) {
	const { rows } = await db.allDocs({ include_docs: true });

	mapDataLayer.addGeoJson({
		type: 'FeatureCollection',
		features: rows.map(row => docToFeature(row.doc)).filter(geo => geo != null),
	});

	return db.changes({
		since: 'now',
		include_docs: true,
		live: true,
	}).on('change', ({ id, deleted, doc }) => {
		if (deleted) {
			const feature = mapDataLayer.getFeatureById(id);
			if (feature != null) mapDataLayer.remove(feature);
		} else {
			mapDataLayer.addGeoJson(docToFeature(doc));
		}
	});
}
