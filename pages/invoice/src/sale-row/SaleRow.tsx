import { createElement, SFC } from 'react'; /** @jsx createElement */
import { Sale } from '@ubc-farm/databases'
import { centsToString } from '@ubc-farm/money';

import PriceField from './PriceField';
import DeleteButton from './DeleteButton';

interface SaleRowProps {
	sale: Sale,
	onDelete: (e: React.MouseEvent<HTMLButtonElement>) => void,
}

const SaleRow: SFC<SaleRowProps> = ({ sale, onDelete }) => (
	<tr className="invoice-row">
		<td className="item-col">{sale.item}</td>
		<td className="description-col">{sale.description}</td>
		<td className="unit-cost-col">
			{sale.unitCost ? centsToString(sale.unitCost) : ''}
		</td>
		<td className="quantity-col">{sale.quantity}</td>

		<PriceField sale={sale} />
		<DeleteButton onDelete={onDelete} />
	</tr>
);

export default SaleRow;
