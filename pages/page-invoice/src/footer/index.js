import { createElement } from 'react'; /** @jsx createElement */

import Subtotal from './subtotal.js';
import Total from './total.js';
import AmountPaid from './amount-paid.js';
import BalanceDue from './balance-due.js';

export default () => (
	<tfoot>
		<Subtotal />
		<Total />
		<AmountPaid />
		<BalanceDue />
	</tfoot>
);

