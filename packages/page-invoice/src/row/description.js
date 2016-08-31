import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import { Field } from 'redux-form';
import input from './input.js';

const DescriptionField = ({ parent }) => (
	<td>
		<Field
			name={`${parent}.description`}
			component={input}
			spellCheck
		/>
	</td>
);

DescriptionField.propTypes = { parent: PropTypes.string.isRequired };

export default DescriptionField;
