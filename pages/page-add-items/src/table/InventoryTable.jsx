import { createElement, PropTypes } from 'react';
import Table, { Column } from '@ubc-farm/table-base';
import { centsToString } from '@ubc-farm/money';
import moment from 'moment';
import { connect } from 'react-redux';
import { getTable } from '../redux/table.js';
import { getSelected, toggle } from '../redux/selected.js';
/** @jsx createElement */

function nullToNA(str) { return str === null ? 'N/A' : str; }

const InventoryTable = props => (
	<Table
		{...props}
		rowClassName={row => (props.selected === row.id ? 'row--selected' : null)}
	>
		<Column
			field="id" isKey
			format={id => (
				<input
					type="radio"
					checked={props.selected === id}
					onChange={() => props.onChange(id)}
				/>
			)}
		/>
		<Column field="class">Class</Column>
		<Column field="product">Product</Column>
		<Column field="description">Description</Column>
		<Column field="quantity" columnClassName="number-col">Quantity</Column>
		<Column field="unit">Unit</Column>
		<Column
			field="valuePerUnit"
			columnClassName="number-col"
			format={int => (int ? centsToString(int) : null)}
		>
			Value / unit
		</Column>
		<Column field="entryDate" columnClassName="number-col">Entry date</Column>
		<Column
			field="lifeSpan"
			format={iso => (iso ? moment.duration(iso).humanize() : null)}
		>
			Lifespan
		</Column>
		<Column field="location">Location</Column>
		<Column
			field="salvageValue"
			format={int => (int ? centsToString(int) : nullToNA(int))}
		>
			Salvage Value
		</Column>
		<Column field="barcode">Barcode</Column>
		<Column field="supplier" format={nullToNA}>Supplier</Column>
		<Column field="sku" format={nullToNA}>SKU</Column>
	</Table>
);

InventoryTable.propTypes = {
	selected: PropTypes.instanceOf(Set).isRequired,
	onChange: PropTypes.func.isRequired,
};

export default connect(
	state => ({
		tableData: getTable(state),
		selected: getSelected(state),
	}),
	dispatch => ({
		onChange: id => dispatch(toggle(id)),
	}),
)(InventoryTable);
