import { createElement } from 'react';
import { Field, reduxForm } from 'redux-form';

import { addRow } from '../redux/table.js';
import inputToRow from './inputToRow.js';
/** @jsx createElement */

const AddItem = props => (
	<form onSubmit={props.handleSubmit}>
		<div className="inventory-AddItem-row">
			<label htmlFor="class">Class</label>
			<Field name="class" component="select">
				<option value="Variable">Variable</option>
				<option value="Fixed">Fixed</option>
			</Field>
		</div>
		<div className="inventory-AddItem-row">
			<label htmlFor="product">Product</label>
			<Field name="product" component="input" type="text" />
		</div>
		<div className="inventory-AddItem-row">
			<label htmlFor="description">Description</label>
			<Field name="description" component="input" type="text" />
		</div>
		<div className="inventory-AddItem-row">
			<label htmlFor="quantity">Quantity</label>
			<Field name="quantity" component="input" type="number" />
		</div>
		<div className="inventory-AddItem-row">
			<label htmlFor="unit">Unit</label>
			<Field name="unit" component="select">
				<option value="kg">kg</option>
				<option value="each">each</option>
			</Field>
		</div>
		<div className="inventory-AddItem-row">
			<label htmlFor="valuePerUnit">Value / unit</label>
			<Field name="valuePerUnit" component="input" type="number" step="0.01" />
		</div>
		<div className="inventory-AddItem-row">
			<label htmlFor="entryDate">Entry date</label>
			<Field name="entryDate" component="input" type="datetime-local" />
		</div>
		<div className="inventory-AddItem-row">
			<label htmlFor="lifeSpan">Lifespan</label>
			<Field name="lifeSpan" component="input" type="text" />
		</div>
		<div className="inventory-AddItem-row">
			<label htmlFor="location">Location</label>
			<Field name="location" component="input" type="text" />
		</div>
		<div className="inventory-AddItem-row">
			<label htmlFor="salvageValue">Salvage Value</label>
			<Field name="salvageValue" component="input" type="number" step="0.01" />
		</div>
		<div className="inventory-AddItem-row">
			<label htmlFor="barcode">Barcode</label>
			<Field name="barcode" component="input" type="text" />
		</div>
		<div className="inventory-AddItem-row">
			<label htmlFor="supplier">Supplier</label>
			<Field name="supplier" component="input" type="text" />
		</div>
		<div className="inventory-AddItem-row">
			<label htmlFor="sku">SKU</label>
			<Field name="sku" component="input" type="text" />
		</div>

		<button type="submit">Add</button>
	</form>
);

export default reduxForm({
	form: 'add-inventory',
	onSubmit(values, dispatch) {
		dispatch(addRow(inputToRow(values)));
	}
})(AddItem);
