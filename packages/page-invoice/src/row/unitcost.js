import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import MoneyInput from 'ubc-farm-inputs/money.js';
import { reSortOnChange } from '../redux/actions/index.js';

const Input = connect(
	undefined,
	(dispatch, { input }) => ({
		onChange(e) {
			input.onChange(e);
			dispatch(reSortOnChange(input.name));
		},
	}),
	(stateProps, dispatchProps, ownProps) => {
		const result = Object.assign({}, ownProps);
		result.input = Object.assign({}, ownProps.input, dispatchProps);
		return result;
	}
)(MoneyInput);

const UnitCostField = props => (
	<td className="align-right">
		<Field {...props} name={`${props.parent}.unitCost`} component={Input} />
	</td>
);

UnitCostField.propTypes = {	parent: PropTypes.string.isRequired };

export default UnitCostField;
