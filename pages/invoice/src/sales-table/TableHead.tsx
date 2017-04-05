import { createElement, SFC } from 'react'; /** @jsx createElement */

const TableHead: SFC<void> = () => (
	<thead>
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
