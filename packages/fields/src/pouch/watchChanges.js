import db from '../db.js';

export default function watchChanges(mapDataLayer) {
	const emitter = db.changes({
		live: true,
		include_docs: true,
		since: 'now',
	}).on('change', async ({ id, deleted, doc }) => {
		const dataLayer = await mapDataLayer;
		if (deleted) {
			const feature = dataLayer.getFeatureById(id);
			if (feature) dataLayer.remove(feature);
			return;
		}

		dataLayer.addGeoJson({
			type: 'Feature',
			geometry: doc.geometry,
			id: doc._id,
			properties: { _rev: doc._rev },
		});
	});

	return () => emitter.cancel();
}
