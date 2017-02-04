import db from '../db.js';

export default async function importFields(dataLayer) {
	const response = await db.allDocs({ include_docs: true });

	const collection = {
		type: 'FeatureCollection',
		features: response.rows.map(({ geometry, _id, _rev }) => ({
			type: 'Feature',
			geometry,
			id: _id,
			properties: { _rev },
		})),
	}

	return (await dataLayer).addGeoJson(collection);
}
