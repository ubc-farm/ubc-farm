import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import { Field } from 'redux-form';

const DescriptionField = ({ parent }) => (
	<td>
		<Field
			name={`${parent}.description`}
			component="input"
			spellCheck
			className="invoice-table-input"
		/>
	</td>
);

DescriptionField.propTypes = { parent: PropTypes.string.isRequired };

export default DescriptionField;
