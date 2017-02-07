import geojsonArea from '@turf/area';
import centroid from '@turf/centroid';

/**
 * @returns {string|number[]|null}
 */
export function getLocation({ location, geometry }) {
	if (location) return location;
	else if (geometry) {
		const center = centroid({ type: 'Feature', geometry });
		return center.geometry.coordinates;
	} else return null;
}

/**
 * @returns {string}
 */
export function getLocationString(field) {
	const location = getLocation(field);
	if (typeof location === 'string') return location;
	else if (location === null) return '';

	const [lng, lat] = location.map(n => n.toFixed(2));
	return `Lat: ${lat}, Long: ${lng}`;
}

/**
 * Computes the area of a field
 * @param {Object} field
 * @param {number} [field.area] area in acres
 * @param {GeoJSON.Polygon} [field.geometry] polygon representing the field
 * @returns {number|null} area in acres. Null if neither area or geometry is present
 * @see http://gis.stackexchange.com/questions/124853/converting-area-of-a-polygon-from-steradians-to-square-kilometers-using-d3-js
 */
export function getArea({ area, geometry }) {
	if (area) return area;
	else if (geometry) {
		const polyArea = geojsonArea({ type: 'Feature', geometry });

		return Math.ceil(polyArea * 0.000247105);
	} else {
		return null;
	}
}

/**
 * @returns {string}
 */
export function getAcres(field) {
	const mSquared = getArea(field);

	if (mSquared === null) return '';
	return `${mSquared} ac`;
}
