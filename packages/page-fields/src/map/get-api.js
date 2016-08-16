import map from './map.js';

export default new Promise(resolve => {
	map.data.loadGeoJson('/api/fields/geojson', undefined, resolve);
})