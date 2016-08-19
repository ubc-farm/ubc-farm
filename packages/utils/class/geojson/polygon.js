import Geometry from './geometry.js';
import LineString from './linestring.js';
import Position from './position.js';

/**
 * Polygon coordinates contains LineStrings where the last point is equal to
 * the first point. If multiple lines are specified, the first will be the
 * exterior ring and the others will be holes in the polygon.
 * @extends module:lib/geojson~Geometry
 * @alias module:lib/geojson.Polygon
 * @see http://geojson.org/geojson-spec.html#polygon
 */
export default class Polygon extends Geometry {
	get type() { return 'Polygon'; }

	/** @param {...LineString} lines */
	constructor(...lines) {
		super();
		/** @type {Position[][]} */
		this.coordinates = lines.map(line => new LineString(line).coordinates);
	}

	/**
	 * Converts value into a Polygon
	 * @param {Polygon|*} value
	 */
	static from(value) {
		if (Array.isArray(value)) return new Polygon(value);
		return super.from(value);
	}

	/**
	 * Converts Google Maps API Polygon to GeoJSON Polygon
	 * @param {google.maps.Polygon} polygon
	 * @returns {Polygon}
	 */
	static fromGoogle(polygon) {
		return new Polygon(
			...polygon.getPaths().getArray().map(path => {
				const p = path.getArray().map(Position.fromGoogle);
				p.push(p[0]);
				return p;
			})
		);
	}
}
