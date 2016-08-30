import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import { Field } from 'redux-form';

const QuantityField = ({ parent }) => (
	<td className="align-right">
		<Field
			name={`${parent}.quantity`}
			component="input"
			type="number" step="any"
		/>
	</td>
);

QuantityField.propTypes = { parent: PropTypes.string.isRequired };

export default QuantityField;
