import db from '../db.js';

export default async function importFields(dataLayer) {
	const response = await db.find({ fields: ['_id', 'geometry'] });

	const collection = {
		type: 'FeatureCollection',
		features: response.docs.map(doc => ({
			type: 'Feature',
			geometry: doc.geometry,
			id: doc._id,
			properties: { _rev: doc._rev },
		})),
	}

	return (await dataLayer).addGeoJson(collection);
}
