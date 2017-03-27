import { createElement } from 'react'; /** @jsx createElement */
import CheckboxHeader from './checkbox.js';
import TH from './th.js';

export default () => (
	<thead>
		<tr className="table-th-row">
			<CheckboxHeader />
			<TH id="item">Item</TH>
			<TH id="description">Description</TH>
			<TH id="unitCost" align="right" title="Cost per unit of this item">
				Unit Cost ($)
			</TH>
			<TH id="quantity" align="right">Quantity</TH>
			<TH id="price" align="right">Price ($)</TH>
		</tr>
	</thead>
);
