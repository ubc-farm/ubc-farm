import { polygonArea, polygonCentroid } from 'd3-polygon';

/**
 * @returns {string|number[]|null}
 */
export function getLocation({ location, geometry }) {
	if (location) return location;
	else if (geometry) return polygonCentroid(geometry.coordinates[0]);
	else return null;
}

/**
 * @returns {string}
 */
export function getLocationString(field) {
	const location = getLocation(field);
	if (typeof location === 'string') return location;
	else if (location === null) return '';

	const [lng, lat] = location.map(n => n.toPrecision(2));
	return `Lat: ${lat}, Long: ${lng}`;
}

/**
 * Computes the area of a field
 * @param {Object} field
 * @param {number} [field.area] area in acres
 * @param {GeoJSON.Polygon} [field.geometry] polygon representing the field
 * @returns {number|null} area in acres. Null if neither area or geometry is present
 */
export function getArea({ area, geometry }) {
	if (area) return area;
	else if (geometry) return polygonArea(geometry.coordinates[0]) * 0.000247105;
	else return null;
}

/**
 * @returns {string}
 */
export function getAcres(field) {
	const mSquared = getArea(field);

	if (mSquared === null) return '';
	return `${mSquared} ac`;
}
