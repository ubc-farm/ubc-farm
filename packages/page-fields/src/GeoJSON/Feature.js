/**
 * An object containing a geometry and some other properties
 * @alias module:lib/geojson.Feature
 * @see http://geojson.org/geojson-spec.html#feature-objects
 */
export default class Feature {
	get type() { return 'Feature'; }

	/**
	 * @param {Geometry} geometry
	 * @param {Object} properties
	 * @param {any} [id]
	 */
	constructor(geometry, properties = null, id) {
		this.geometry = geometry;
		if (typeof properties !== 'object' && properties !== undefined) {
			this.id = properties;
		} else {
			this.properties = properties;
			if (id) this.id = id;
		}
	}

	/** @returns {Object} */
	toJSON() {
		const { type, geometry, properties, id } = this;
		const json = { type, geometry, properties };
		if (id) json.id = id;
		return json;
	}
}
