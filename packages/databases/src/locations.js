/* eslint-disable no-param-reassign */
import geojsonArea from '@turf/area';
import centroid from '@turf/centroid';
import { generate } from 'shortid';
import { route } from 'docuri';
import PouchDB from './utils/load-pouch.js';

export const uri = route(':type/:name/:hash');

export const db = new PouchDB('locations');
export default Promise.all([
	db.createIndex({ index: { fields: ['name'] } }),
	db.createIndex({ index: { fields: ['location'] } }),
	db.createIndex({ index: { fields: ['crop.variety'] } }),
]).then(() => db);

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
 * @param {Object|string|number[]|null} field or location from getLocation()
 * @returns {string} If a custom location string is defined, that is returned.
 * Otherwise, `Lat: ${}, Long: ${}` is returned if the location is defined as a
 * point. If the location not defined, an empty string is returned.
 */
export function getLocationString(field) {
	let location;
	if (typeof field === 'string' || field == null || Array.isArray(field)) {
		location = field;
	} else {
		location = getLocation(field);
	}

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
 * @param {Object|number|null} field or area from getArea
 * @returns {string} string representing acres. Empty string if no defined area,
 * or a number followed by ' ac'.
 */
export function getAcres(field) {
	let mSquared;
	if (typeof field === 'number' || field == null) mSquared = field;
	else mSquared = getArea(field);

	if (mSquared === null) return '';
	return `${mSquared} ac`;
}

db.transform({
	incoming(doc) {
		const { _id } = doc;
		doc.name = doc.name ? doc.name.replace('/', '') : ' ';

		const isDocURI = _id && uri(_id);
		if (!isDocURI) {
			const { type = ' ', name, hash = _id || generate() } = doc;
			doc._id = uri({ type, name, hash });
			delete doc.type;
			delete doc.name;
			delete doc.hash;
		}

		doc.location = getLocation(doc);
		doc.area = getArea(doc);
		return doc;
	},
	outgoing(doc) {
		return Object.assign(doc, uri(doc._id));
	}
});
