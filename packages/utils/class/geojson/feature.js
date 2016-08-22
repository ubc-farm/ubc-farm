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
		Object.assign(this, { geometry, properties });
		if (id) this.id = id;
	}

	/** @returns {Object} */
	toJSON() {
		const { type, geometry, properties, id } = this;
		const json = { type, geometry, properties };
		if (id) json.id = id;
		return json;
	}
}
