import { createElement } from 'react'; /** @jsx createElement */
import { Field } from 'redux-form';
import MoneyInput from 'ubc-farm-inputs/money.js';

const AmountPaidRow = () => (
	<tr className="total-row">
		<th scope="row" className="align-right no-bold" colSpan={5}>
			Amount Paid
		</th>

		<td className="align-right">
			<Field name="amountPaid" component={MoneyInput}	/>
		</td>
	</tr>
);

export default AmountPaidRow;
