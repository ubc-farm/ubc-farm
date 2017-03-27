import { csvFormat } from 'd3-dsv';

const fields = [
	'id',
	'class',
	'product',
	'description',
	'quantity',
	'unit',
	'valuePerUnit',
	'entryDate',
	'lifeSpan',
	'location',
	'salvageValue',
	'barcode',
	'supplier',
	'sku',
];

export function download(filename, text) {
	const element = document.createElement('a');
	element.setAttribute('href',
		`data:text/plain;charset=utf-8,${encodeURIComponent(text)}`);
	element.setAttribute('download', filename);
	element.setAttribute('hidden', true);

	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}

export function createCSV(tableData) {
	return csvFormat(tableData, fields);
}

export default function exportCSV(tableData) {
	download('inventory.csv', createCSV(tableData));
}
