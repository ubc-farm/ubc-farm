import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import { datalistID } from '../redux/selectors.js';
import { autofillFromItem } from '../redux/actions/index.js';

let ItemInput = ({ input, list }) => (
	<input {...input} spellCheck list={list} className="invoice-table-input" />
);
ItemInput.propTypes = {
	input: PropTypes.object.isRequired,
	list: PropTypes.string.isRequired,
};


ItemInput = connect(
	state => ({
		list: datalistID(state),
	}),
	(dispatch, { input, parent }) => ({
		onBlur(e) {
			dispatch(autofillFromItem(parent, e.target.value));
			input.onBlur(e);
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
