import { createElement, PureComponent } from 'react'; /** @jsx createElement */
import { Sale } from '@ubc-farm/databases'
import { MoneyInput } from '@ubc-farm/react-inputs';

import PriceField from './PriceField';
import DeleteButton from './DeleteButton';

interface EditSaleRowProps {
	sale: Sale,
	index: number,
	onChange(index:number, e: React.ChangeEvent<any>): void,
	onClick(index:number, e: React.MouseEvent<HTMLTableRowElement>): void,
}

/**
 * A modified version of SaleRow that can be edited.
 */
export default class EditingSaleRow extends PureComponent<EditSaleRowProps, void> {
	handleClick: (e: React.MouseEvent<HTMLTableRowElement>) => void
	handleChange: (e: React.ChangeEvent<any>) => void

	constructor(props) {
		super(props);

		this.handleClick = props.onClick.bind(this, props.index);
		this.handleChange = props.onChange.bind(this, props.index);
	}

	render() {
		const { handleClick, handleChange, props: { sale } } = this;

		return (
			<tr className="invoice-row editing" onDoubleClick={handleClick}>
				<td className="item-col">
					<input
						name="item" type="text" value={sale.item || ''}
						onChange={handleChange}
					/>
				</td>
				<td className="description-col">
					<input
						name="description" type="text" value={sale.description || ''}
						onChange={handleChange}
					/>
				</td>
				<td className="unit-cost-col">
					<MoneyInput
						name="unitCost"
						value={sale.unitCost || null}
						onChange={handleChange}
					/>
				</td>
				<td className="quantity-col">
					<input
						name="quantity" type="number" value={sale.quantity || ''}
						onChange={handleChange}
					/>
				</td>

				<PriceField sale={sale} />
				<DeleteButton blank />
			</tr>
		)
	}
}
