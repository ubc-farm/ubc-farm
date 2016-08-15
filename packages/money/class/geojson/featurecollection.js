/**
 * A collection of Features. Acts like it has a GeoJSON shape
 * but it's just some fluff over an array. Consequently you can use
 * any array methods directly on the FeatureCollection instead of
 * on FeatureCollection#features.
 * @extends Array
 * @alias module:lib/geojson.FeatureCollection
 * @see http://geojson.org/geojson-spec.html#feature-collection-objects
 */
export default class FeatureCollection extends Array {
	get type() {return 'FeatureCollection'}

	/** @param {Feature[]} features - an array or iterable of Features */
	constructor(features) {
		super();
		this.push(...features);
	}

	/**
	 * @type {Feature[]|Iterable<Feature>} returns the array. 
	 * Setting a value here will clear the array then push the values with 
	 * a spread operator, meaning an iterator can be used instead of an array.
	 */
	get features() {return this;}
	set features(values) {
		this.length = 0;
		this.push(...values);
	}

	/**
	 * Called by JSON.stringify. Returns an object that matches the
	 * GeoJSON spec.
	 * @example
	 * featureCollection == [featureA, featureB]
	 * featureCollection.toJSON() == {
	 *   type: 'FeatureCollection',
	 *   features: [featureA, featureB]
	 * }
	 * @returns {Object}
	 */
	toJSON() {
		const {type} = this;
		return {type, features: Array.from(this)}
	}
} 