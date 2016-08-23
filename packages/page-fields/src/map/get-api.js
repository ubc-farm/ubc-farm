import map from './map.js';

export default fetch('/api/fields/geojson').then(response => response.json())
	.then(geojson => map.data.addGeoJson(geojson));
