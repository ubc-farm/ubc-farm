import worker from '../worker/worker.js';
import { toGeoJson } from '../map/utils/index.js';
import getSelected from './list.js';

/**
 * @returns {Promise<GeoJSON.Feature>} a polygon feature created from
 * the merged cells selected on the map
 */
export default function mergeCells(mapData) {
	const geojson = getSelected(mapData).map(toGeoJson);
	return Promise.all(geojson).then(cells => worker.postMessage({ cells }));
}
