/**
 * @param {google.maps.Data} mapData layer to add to
 * @returns {Promise<google.maps.Data.Feature[]>} newly added features
 */
export default function getApi(mapData) {
	return fetch('/api/fields/geojson')
	.then(response => response.json())
	.then(geojson => mapData.addGeoJson(geojson));
}
