import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import { Field } from 'redux-form';
import MoneyInput from 'ubc-farm-inputs/money.js';

const AmountPaidRow = () => (
	<tr className="total-row">
		<th scope="row" className="align-right" colSpan={4} className="no-bold">
			Amount Paid
		</th>

		<td className="align-right">
			<Field name="amountPaid" component={MoneyInput}	/>
		</td>
	</tr>
);

AmountPaidRow.propTypes = {	parent: PropTypes.string.isRequired };

export default AmountPaidRow;
