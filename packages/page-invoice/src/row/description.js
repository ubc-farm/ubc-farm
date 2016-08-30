import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import { Field } from 'redux-form';

const DescriptionField = ({ parent }) => (
	<th scope="row">
		<Field
			name={`${parent}.description`}
			component="input"
			spellCheck
		/>
	</th>
);

DescriptionField.propTypes = { parent: PropTypes.string.isRequired };

export default DescriptionField;
