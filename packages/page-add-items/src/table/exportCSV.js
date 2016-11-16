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

function wrap(text) {
	return text.includes(',') ? `"${text}` : text;
}

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
	const header = fields.join(',');

	const rows = tableData.reduce((csv, row) => {
		const [firstField, ...restFields] = fields;
		let rowText = `${wrap(row[firstField])}`;
		rowText += restFields.reduce((txt, f) => `${txt},${wrap(row[f])}`, '');
		return `${rowText}\n`;
	}, '');

	return `${header}\n${rows}`;
}

export default function exportCSV(tableData) {
	download('inventory.csv', createCSV(tableData));
}
