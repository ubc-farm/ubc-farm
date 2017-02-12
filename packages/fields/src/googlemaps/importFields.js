/**
 * @param {Object[]|Promise<Object[]>} rows
 * @param {google.maps.Data|Promise<google.maps.Data>} dataLayer
 */
export default async function importFields(rows, dataLayer) {
	const collection = {
		type: 'FeatureCollection',
		features: (await rows).map(({ doc: { geometry }, id, value: { rev } }) => ({
			type: 'Feature',
			geometry,
			id,
			properties: { rev },
		})),
	};

	return (await dataLayer).addGeoJson(collection);
}
