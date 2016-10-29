import Position from './position.js';
import Geometry from './geometry.js';

/**
 * A string of positions that forms a line
 * @extends module:lib/geojson~Geometry
 * @alias module:lib/geojson.LineString
 * @see http://geojson.org/geojson-spec.html#linestring
 */
export default class LineString extends Geometry {
	get type() { return 'LineString'; }

	/** @param {Position[]} positions */
	constructor(positions) {
		super();
		/** @type {Position[]} */
		this.coordinates = positions.map(Position.from);
	}
}
