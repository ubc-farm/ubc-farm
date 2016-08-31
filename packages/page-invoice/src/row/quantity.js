import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import { Field } from 'redux-form';
import input from './input.js';

const QuantityField = ({ parent }) => (
	<td className="align-right">
		<Field
			name={`${parent}.quantity`}
			component={input}
			type="number" step="any"
			className="invoice-table-input input-quantity"
		/>
	</td>
);

QuantityField.propTypes = { parent: PropTypes.string.isRequired };

export default QuantityField;
