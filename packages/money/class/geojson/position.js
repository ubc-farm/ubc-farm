/**
 * Position used for GeoJSON. A position can have many keys.
 * If given an object instead of an array, the first and second
 * keys are set from the x and y properties.
 * Position is an iterable object, and as a result can be turned into an array
 * by using Array.from
 * @alias module:lib/geojson.Position
 * @see http://geojson.org/geojson-spec.html#positions
 */
export default class Position {
	/**
	 * @param {number[]|Object} values of the position. 
	 * @param {number} value.x - set as value[0]
	 * @param {number} value.y - set as value[1]
	 * @throws {TypeError} If value is not an array or an object with x and y
	 */
	constructor(value) {
		if (Array.isArray(value))
			for (let key in value) this[key] = value[key];
		else if ('x' in value && 'y' in value) {
			const {x, y} = value;
			Object.assign(this, {0: x, 1: y});
		} else {
			throw TypeError('Position must be called with ' + 
				'either an array or an object with properties x and y');
		}
	}

	/** Similar to Promise.resolve(), converts value into a Position */
	static from(value) {
		if (value instanceof Position) return value;
		else return new Position(value);
	}

	/**
	 * Converts Google Maps API LatLng to Position
	 * @param {google.maps.LatLng} latlng
	 * @returns {Position}
	 */
	static fromGoogle(latlng) {
		return new Position([latlng.lng(), latlng.lat()]);
	}

	/** 
	 * For JSON.stringify serialization
	 * @returns {Array}
	 */
	toJSON() {
		return Array.from(this);
	}

	/** 
	 * Generator function to get values from this Position. Aligns with 
	 * interator protocol, and allows a position to be easily conveted into an
	 * array.
	 * @example
	 * const position = new Position({x: 12, y: 34})
	 * Array.from(position) //[12, 34]
	 * [...position]        //[12, 34]
	 * @returns {Generator}
	 */
	* [Symbol.iterator]() {
		let i = 0;
		while (true) {
			if (i in this) yield this[i];
			else break;
			i++;
		}
	}

	/**
	 * @type {number} number of dimensions in this point. Let's you call push on
	 * a position.
	 * @example
	 * let position = new Position([12, 34]);
	 * [].push.call(position, 56);
	 * 
	 * position.toJSON(); //[12, 34, 56]
	 */
	get length() {
		let i = 0; 
		for (const _ of this) i++;
		return i;
	}

	//aliases
	get lat() {return this[1]}
	get lng() {return this[0]}
	get x() {return this[0]}
	get y() {return this[1]}
}