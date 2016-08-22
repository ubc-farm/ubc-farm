import { createElement as h, PropTypes } from 'react'; /** @jsx h */
import { propTypes } from 'redux-form';

const AddressField = ({ name, touched, input, addressValue, label }) => (
	<div>
		<label htmlFor={name}>{label}</label>
		<textarea
			{...input}
			id={name}
			value={touched ? input.value : addressValue}
		/>
	</div>
);

AddressField.propTypes = Object.assign({}, propTypes, {
	addressValue: PropTypes.string,
	label: PropTypes.node,
});

export default AddressField;
