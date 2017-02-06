import { geoPath, geoOrthographic } from 'd3-geo';

const w = 720; const h = 640;
const projection = geoOrthographic()
	.scale(3660)
	.rotate([-3, -46.35])
  .clipExtent([[0, 0], [w, h]])
	.translate([w / 2, h / 2]);
const path = geoPath.path().projection(projection);

/**
 * @returns {string|number[]|null}
 */
export function getLocation({ location, geometry }) {
	if (location) return location;
	else if (geometry) return path.centroid(geometry);
	else return null;
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
		const earthAreaInAcres = 126e9;
		const steradiansInSphere = 12.56637;

		return Math.ceil((path.area(geometry) / steradiansInSphere) * earthAreaInAcres);
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
