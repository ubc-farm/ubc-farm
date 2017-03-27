import { overwriteCells } from '../../redux/actions/index.js';
import store from '../../redux/index.js';

import { data as mapData } from '../map.js';
import { isUnsaved } from '../utils/index.js';

/**
 * Deletes a polygon from the map. If it hasn't been saved, the polygon
 * is simply removed from the map.
 * If an initial polygon exists, it is redownloaded.
 * If it has been saved, the polygon is DELETEd from the server.
 * @param {string|google.maps.Data.Feature} id of the polygon
 * @returns {Promise}
 */
export default function deletePolygon(identifier) {
	let id;
	let feature;
	if (typeof identifier === 'object') {
		feature = identifier;
		id = feature.getId();
	} else {
		feature = mapData.getFeatureById(id);
		id = identifier;
	}

	if (isUnsaved(feature)) {
		mapData.remove(feature);
		store.dispatch(overwriteCells());
		if (Number.isNaN(Number(id))) return Promise.resolve();

		return fetch(`/api/fields/geojson/${id}`).then(response => {
			if (!response.ok) return Promise.reject(response.json());
			return response.json();
		})
		.then(geojson => mapData.addGeoJson(geojson));
	}

	return fetch(`/api/fields/${id}`, { method: 'DELETE' }).then(response => {
		if (response.ok) {
			console.log(`Deleted Field ${id}`);
			mapData.remove(feature);
			store.dispatch(overwriteCells());
		}
		else console.error(response);
	});
}
