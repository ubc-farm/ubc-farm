import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import reformed from 'react-reformed';
import { connect } from 'react-redux';
import { classlist as cx } from '@ubc-farm/utils';
import { addRow } from '../redux/table.js';
import { stopAdding, isAdding } from '../redux/adding.js';
import inputToRow from './inputToRow.js';

const AddItem = ({ bindInput, model, onSubmit, className }) => (
	<form
		onSubmit={(e) => { e.preventDefault(); onSubmit(model); }}
		className={cx('inventory-AddItem', className)}
	>
		<div className="inventory-AddItem-row">
			<label htmlFor="class">Class</label>
			<select {...bindInput('class')}>
				<option value="Variable">Variable</option>
				<option value="Fixed">Fixed</option>
			</select>
		</div>
		<div className="inventory-AddItem-row">
			<label htmlFor="product">Product</label>
			<input type="text" {...bindInput('product')} />
		</div>
		<div className="inventory-AddItem-row">
			<label htmlFor="description">Description</label>
			<input type="text" {...bindInput('description')} />
		</div>
		<div className="inventory-AddItem-row">
			<label htmlFor="quantity">Quantity</label>
			<input type="number" {...bindInput('quantity')} />
		</div>
		<div className="inventory-AddItem-row">
			<label htmlFor="unit">Unit</label>
			<select {...bindInput('unit')}>
				<option value="kg">kg</option>
				<option value="each">each</option>
			</select>
		</div>
		<div className="inventory-AddItem-row">
			<label htmlFor="valuePerUnit">Value / unit</label>
			<input type="number" step="0.01" {...bindInput('valuePerUnit')} />
		</div>
		<div className="inventory-AddItem-row">
			<label htmlFor="entryDate">Entry date</label>
			<input type="date" {...bindInput('entryDate')} />
		</div>
		<div className="inventory-AddItem-row">
			<label htmlFor="lifeSpan">Lifespan</label>
			<input type="text" {...bindInput('lifeSpan')} />
		</div>
		<div className="inventory-AddItem-row">
			<label htmlFor="location">Location</label>
			<input type="text" {...bindInput('location')} />
		</div>
		<div className="inventory-AddItem-row">
			<label htmlFor="salvageValue">Salvage Value</label>
			<input type="number" step="0.01" {...bindInput('salvageValue')} />
		</div>
		<div className="inventory-AddItem-row">
			<label htmlFor="barcode">Barcode</label>
			<input type="text" {...bindInput('barcode')} />
		</div>
		<div className="inventory-AddItem-row">
			<label htmlFor="supplier">Supplier</label>
			<input type="text" {...bindInput('supplier')} />
		</div>
		<div className="inventory-AddItem-row">
			<label htmlFor="sku">SKU</label>
			<input type="text" {...bindInput('sku')} />
		</div>

		<button type="submit">Add</button>
	</form>
);

AddItem.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	model: PropTypes.object.isRequired,
	bindInput: PropTypes.func.isRequired,
	className: PropTypes.string,
};

export default connect(
	state => ({
		className: isAdding(state) ? 'inventory-AddItem--open' : null,
	}),
	dispatch => ({
		onSubmit(model) {
			dispatch(addRow(inputToRow(model)));
			dispatch(stopAdding());
		},
	}),
)(reformed()(AddItem));
