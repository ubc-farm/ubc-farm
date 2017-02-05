/**
 * @param {Object[]|Promise<Object[]>} rows
 * @param {google.maps.Data|Promise<google.maps.Data>} dataLayer
 */
export default async function importFields(rows, dataLayer) {
	const collection = {
		type: 'FeatureCollection',
		features: (await rows).map(({ geometry, _id, _rev }) => ({
			type: 'Feature',
			geometry,
			id: _id,
			properties: { _rev },
		})),
	};

	return (await dataLayer).addGeoJson(collection);
}
