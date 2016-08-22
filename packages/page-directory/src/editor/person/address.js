import { createElement as h, PropTypes } from 'react'; /** @jsx h */

const AddressField = ({ input, meta, addressValue, label }) => (
	<div>
		<label htmlFor={input.name}>{label}</label>
		<textarea
			{...input}
			id={input.name}
			value={meta.dirty ? input.value : addressValue}
		/>
	</div>
);

AddressField.propTypes = {
	addressValue: PropTypes.string,
	label: PropTypes.node,
	input: PropTypes.object,
	meta: PropTypes.object,
};

export default AddressField;
