/**
 * Creates an object composed of the own string keyed
 * properties of source that are not set to be omitted.
 * @param {Object} source
 * @param {...string|string[]} props
 * @returns {Object}
 */
export default function omit(source = {}, ...props) {
	if (props.length === 0 && Array.isArray(props[0])) props = props[0];

	let target = {};
	for (const key in source) {
		if (!props.includes(key)) target[key] = source[key];
	}

	return target;
}