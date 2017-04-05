import { createElement, SFC } from 'react'; /** @jsx createElement */
import { Sale } from '@ubc-farm/databases'
import { MoneyInput } from '@ubc-farm/react-inputs';

import PriceField from './PriceField';
import DeleteButton from './DeleteButton';

interface EditSaleRowProps {
	sale: Sale,
	onChange(e: React.ChangeEvent<any>): void,
	onClick(e: React.MouseEvent<HTMLTableRowElement>): void,
}

/**
 * A modified version of SaleRow that can be edited.
 */
const EditingSaleRow: SFC<EditSaleRowProps> = ({ sale, onChange, onClick }) => (
	<tr className="invoice-row" onClick={onClick}>
		<td className="item-col">
			<input
				name="item" type="text" value={sale.item || ''}
				onChange={onChange}
			/>
		</td>
		<td className="description-col">
			<input
				name="description" type="text" value={sale.description || ''}
				onChange={onChange}
			/>
		</td>
		<td className="unit-cost-col">
			<MoneyInput
				name="unitCost"
				value={sale.unitCost || null}
				onChange={onChange}
			/>
		</td>
		<td className="quantity-col">
			<input
				name="quantity" type="number" value={sale.quantity || ''}
				onChange={onChange}
			/>
		</td>

		<PriceField sale={sale} />
		<DeleteButton blank />
	</tr>
);

export default EditingSaleRow;
