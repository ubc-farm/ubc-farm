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
			<th>Item</th>
			<th>Description</th>
			<th>Unit Cost</th>
			<th>Quantity</th>
			<th>Price</th>
			<th></th>
		</tr>
	</thead>
);

export default TableHead;
