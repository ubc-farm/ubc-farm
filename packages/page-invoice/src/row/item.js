import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import { Field, autofill } from 'redux-form';
import { connect } from 'react-redux';

let ItemInput = ({ input, list }) => (
	<input {...input} spellCheck list={list} className="invoice-table-input" />
);
ItemInput.propTypes = {
	input: PropTypes.object.isRequired,
	list: PropTypes.string.isRequired,
};


ItemInput = connect(
	state => ({
		list: '', // TODO: Get ID from store
	}),
	(dispatch, { input, parent }) => ({
		onBlur(e) {
			const value = e.target.value;
			const trimmed = value.trim().toLowerCase();
			const equipment = []; // TODO: Get from store

			const corresponding = equipment.find(item => (
				item.name.toLowerCase() === trimmed
			));
			if (corresponding !== undefined) {
				dispatch(autofill('invoice',
					`${parent}.description`, corresponding.description));
				dispatch(autofill('invoice',
					`${parent}.unitCost`, corresponding.salvageValue));
				dispatch(autofill('invoice',
					`${parent}.quantity`, corresponding.quantity));
			}

			input.onBlur(value);
		},
	}),
	(stateProps, dispatchProps, ownProps) => {
		const result = Object.assign({}, stateProps, ownProps);
		result.input = Object.assign({}, result.input, dispatchProps);
		return result;
	}
)(ItemInput);


const ItemField = ({ parent }) => (
	<th scope="row">
		<Field name={`${parent}.item`}	component={ItemInput} parent={parent}	/>
	</th>
);
ItemField.propTypes = { parent: PropTypes.string.isRequired };
export default ItemField;
