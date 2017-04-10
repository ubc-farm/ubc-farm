import { createElement, SFC } from 'react'; /** @jsx createElement */

interface HeadProps {
	onAdd(): void,
	state: 'loading' | 'normal' | 'error' | 'success'
}

const TableHead: SFC<HeadProps> = ({ onAdd, state }) => (
	<thead>
		<tr>
			<th colSpan={6} className="has-text-centered">
				<button type="button" onClick={onAdd} className="button">
					Add
				</button>
				{' '}
				<button
					type="submit"
					className={'button' + (state === 'normal' ? '' : ` is-${state}`)}
				>
					Submit
				</button>
			</th>
		</tr>
		<tr>
			<th className="item-col">Item</th>
			<th className="description-col">Description</th>
			<th className="unit-cost-col">Unit Cost</th>
			<th className="quantity-col">Quantity</th>
			<th className="price-col">Price</th>
			<th className="delete-button-col"></th>
		</tr>
	</thead>
);

export default TableHead;
