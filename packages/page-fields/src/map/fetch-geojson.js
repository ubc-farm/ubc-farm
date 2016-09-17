/**
 * Same functionality as data.loadGeoJson, but using the fetch
 * API instead and returning a Promise. data.loadGeoJson seems to have
 * some bugs so I'm using this function instead.
 * @param {google.maps.Data} mapData layer to add to
 * @returns {Promise<google.maps.Data.Feature[]>} newly added features
 */
export default function fetchGeoJson(url, mapData) {
	return fetch(url) // '/api/fields/geojson'
	.then(response => response.json())
	.then(geojson => mapData.addGeoJson(geojson));
}
