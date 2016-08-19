import { createElement as h } from 'react'; /** @jsx h */

import {
	subtotalSelector,
	totalSelector,
	balanceDueSelector,
} from '../redux/selectors.js';

import AmountPaidCell from '../inputs/amount-paid.js';
import TotalRow from './total-row.js';

const InvoiceTotalsFooter = () => (
	<tfoot>
		<TotalRow bold label="Subtotal" selector={subtotalSelector} />
		<TotalRow bold label="Total" selector={totalSelector} />
		<TotalRow
			label="Amount Paid"
			cell={<AmountPaidCell />}
		/>
		<TotalRow bold label="Balance Due (CAD)" selector={balanceDueSelector} />
	</tfoot>
);

export default InvoiceTotalsFooter;
