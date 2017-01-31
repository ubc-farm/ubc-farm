import { data as mapData } from '../map.js';
import { toGeoJson, isUnsaved } from '../utils/index.js';
import rebuildMapFeature from '../rebuild-polygon.js';

/**
 * POSTs a polygon to the server with the given ID
 * @param {string} id of the polygon
 * @returns {Promise<google.maps.Data.Feature>} the saved polygon
 */
export default function savePolygon(id) {
	const feature = mapData.getFeatureById(id);

	if (!isUnsaved(feature)) return Promise.resolve(feature);

	return toGeoJson(feature)
		.then(geojson => fetch('/api/fields/geojson', {
			method: 'POST',
			body: JSON.stringify(geojson),
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		}))
		.then(response => {
			const json = response.json();
			if (!response.ok) return Promise.reject(json);

			return json;
		})
		.then(json => {
			if (typeof json !== 'object' || !('id' in json)) {
				throw new Error(
					'Invalid response, expecting an object ' +
					`with an ID property, instead got ${JSON.stringify(json)}`
				);
			}

			return rebuildMapFeature(mapData, feature, json.id, { isUnsaved: false });
		});
}
