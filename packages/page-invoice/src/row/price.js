import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import Money from 'ubc-farm-money';
import { priceIntSelector } from '../redux/selectors.js';

const PriceField = ({ centsValue }) => (
	<td className="align-right">
		{Money.fromInteger(centsValue).toString()}
	</td>
);
PriceField.propTypes = { centsValue: PropTypes.number };

const invoiceSelector = formValueSelector('invoice');
const ConnectedPrice = connect(
	(state, { parent }) => {
		const rowData = invoiceSelector(parent);

		const priceInt = priceIntSelector(rowData);
		return { centsValue: priceInt };
	}
)(PriceField);
ConnectedPrice.propTypes = { parent: PropTypes.string.isRequired };

export default ConnectedPrice;
