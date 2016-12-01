export default class DefaultMap extends Map {
	/** @param {function} defaultBuilder function that returns default value */
	constructor(iterable, defaultBuilder) {
		super(iterable);
		this.defaultBuilder = defaultBuilder;
	}

	get(key) {
		if (!this.has(key)) this.set(key, this.defaultBuilder());
		return super.get(key);
	}
}
