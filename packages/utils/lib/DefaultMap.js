/**
 * A small wrapper around the native JavaScript Map. When `get`ting an item
 * that doesn't exist in the map, a default value is returned instead.
 */
export default class DefaultMap extends Map {
	/**
	 * @template V
	 * @param {V} defaultValue
	 * @param {Iterable<[any, V]>} [iterable]
	 */
	constructor(defaultValue, iterable) {
		super(iterable);
		this.defaultValue = defaultValue;
	}

	get(key) {
		return super.get(key) || this.defaultValue;
	}
}
