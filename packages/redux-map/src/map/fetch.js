export default function api(mapData) {
	const fields = fetch('/api/fields/geojson')
		.then(response => response.json())
		.then(({ features }) => features.map(item =>
			Object.assign({}, item, { id: `field-${item.id}` })
		));
	const locs = fetch('/api/locations/geojson')
		.then(response => response.json());

	return Promise.all([fields, locs])
	.then(([fieldFeatures, locations]) => {
		const result = Object.assign({}, locations);
		result.features.push(...fieldFeatures);
		return result;
	})
	.then(collection => mapData.addGeoJson(collection));
}
