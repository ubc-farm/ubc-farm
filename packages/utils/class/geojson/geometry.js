/**
 * Base class for Geometry objects such as Polygons
 */
export default class Geometry {
	toJSON() {
		const { type, coordinates } = this;
		return { type, coordinates };
	}

	static parse(geojson) {
		return Object.assign(new this(), geojson);
	}

	/**
	 * Similar to Promise.resolve(): converts the value into a Geometry if it
	 * isn't one already.
	 * @param {Geometry|*} value
	 */
	static from(value) {
		if (value instanceof this) return value;
		else if (value.type && String(value.type) === this.type) {
			return new this(value.coordinates);
		}

		return new this(value);
	}
}
