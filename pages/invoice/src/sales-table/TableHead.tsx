import { createElement, SFC } from 'react'; /** @jsx createElement */

interface HeadProps {
	onAdd(): void,
}

const TableHead: SFC<HeadProps> = ({ onAdd }) => (
	<thead>
		<tr>
			<th>
				<button type="button" onClick={onAdd}>
					Add
				</button>
				<button type="submit">
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
