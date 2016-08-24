import map from './map.js';

export default function getApi() {
	return fetch('/api/fields/geojson')
	.then(response => response.json())
	.then(geojson => map.data.addGeoJson(geojson));
}
