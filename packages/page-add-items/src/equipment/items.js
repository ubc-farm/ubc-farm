import { createElement, PropTypes } from 'react'; /** @jsx createElement */

const ItemInput = ({ input, meta, items }) => {

	const options = [];
	for (const [value, text] of items) {
		options.push(<option value={value}>{text}</option>);
	}

	return (
		<select {...input}>{options}</select>
	);
};

ItemInput.propTypes = {
	input: PropTypes.object,
	meta: PropTypes.object,
	items: PropTypes.instanceOf(Map),
};

export default ItemInput;
