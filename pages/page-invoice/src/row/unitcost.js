import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import { Field } from 'redux-form';
import MoneyInput from 'ubc-farm-inputs/money.js';

const UnitCostField = props => (
	<td className="align-right">
		<Field
			{...props} name={`${props.parent}.unitCost`}
			component={MoneyInput}
		/>
	</td>
);

UnitCostField.propTypes = {	parent: PropTypes.string.isRequired };

export default UnitCostField;
