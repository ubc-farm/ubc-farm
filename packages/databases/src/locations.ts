/* eslint-disable no-param-reassign */
import geojsonArea from '@turf/area';
import centroid from '@turf/centroid';
import { generate } from 'shortid';
import { route } from 'docuri';
import PouchDB from './utils/load-pouch';
import { Index } from './utils/typedefs';

export interface Location {
	_id: string; // `${'field' || 'place'}/${hash}`
	_rev: string;
	name: Index<string>; // name of the location
	geometry?: Object; // GeoJSON geometry object
	location?: Index<string | number[]>; // Either a string describing the
	                                            // location or coordinates.
}

export interface Field extends Location {
	name: string; // name of the location
	area?: number; // Only for fields
	crop?: {
		variety: Index<string>; // name/id of the plant
		quantity: number;
	};
}

export const db = new PouchDB<Location>('locations');
export default Promise.all([
	// db.createIndex({ index: { fields: ['name'] } }),
	// db.createIndex({ index: { fields: ['location'] } }),
	// db.createIndex({ index: { fields: ['crop.variety'] } }),
]).then(() => db);

type LocationDescription = string | number[] | null;
/**
 * @returns {string|number[]|null}
 */
export function getLocation({ location, geometry }: Location): LocationDescription {
	if (location) return location;
	else if (geometry) {
		const center = centroid(<GeoJSON.Feature<any>> { type: 'Feature', geometry });
		return center.geometry.coordinates;
	} else return null;
}

/**
 * @param {Object|string|number[]|null} field or location from getLocation()
 * @returns {string} If a custom location string is defined, that is returned.
 * Otherwise, `Lat: ${}, Long: ${}` is returned if the location is defined as a
 * point. If the location not defined, an empty string is returned.
 */
export function getLocationString(field: Location|LocationDescription) {
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
export function getArea({ area, geometry }: Field) {
	if (area) return area;
	else if (geometry) {
		const polyArea = geojsonArea(<GeoJSON.Feature<any>> { type: 'Feature', geometry });

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
export function getAcres(field: Field|number|null) {
	let mSquared;
	if (typeof field === 'number' || field == null) mSquared = field;
	else mSquared = getArea(field);

	if (mSquared === null) return '';
	return `${mSquared} ac`;
}

db.transform({
	incoming(doc: Location): Location {
		const { _id } = doc;

		doc.location = getLocation(doc);

		if (_id.startsWith('field/')) {
			const field = <Field> doc;
			field.area = getArea(field);
		}
		return doc;
	},
	outgoing(doc: Location): Location {
		return Object.assign(doc, uri(doc._id));
	}
});