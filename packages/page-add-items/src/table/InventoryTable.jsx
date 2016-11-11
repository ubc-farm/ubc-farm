import { createElement } from 'react';
import Table, { Columns } from '@ubc-farm/table-base';
import { centsToString } from '@ubc-farm/money';
import moment from 'moment';
/** @jsx createElement */

function nullToNA(str) {
	if (str === null) return 'N/A';
	else return str;
}

export default function InventoryTable(props) {
	return (
		<Table {...props}>
			<Column field="id" hidden isKey>ID</Column>
			<Column field="class">Class</Column>
			<Column field="product">Product</Column>
			<Column field="description">Description</Column>
			<Column field="quantity">Quantity</Column>
			<Column field="unit">Unit</Column>
			<Column
				field="valuePerUnit"
				format={int => centsToString(int)}
			>
				Value / unit
			</Column>
			<Column field="entryDate">Entry date</Column>
			<Column
				field="lifeSpan"
				format={iso => moment.duration(iso).humanize()}
			>
				Lifespan
			</Column>
			<Column field="location">Location</Column>
			<Column
				field="salvageValue"
				format={int => int === null ? 'N/A' : centsToString(int)}
			>
				Salvage Value
			</Column>
			<Column field="barcode">Barcode</Column>
			<Column field="supplier" format={nullToNA}>Supplier</Column>
			<Column field="sku" format={nullToNA}>SKU</Column>
		</Table>
	);
}
