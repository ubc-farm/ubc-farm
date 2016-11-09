/**
 * Creates a CSV string from the given tableData and column elements
 * @param {Object[]} tableData
 * @param {ReactElement[]} columns
 * @returns {string} csv formatted text
 */
export function toCSV(tableData, columns) {
	const csvHead = columns.reduce((text, props) => {
		if (props.hidden && props.export !== true) return text;
		else if (props.export === false) return text;

		let header = props.csvHeader || String(props.children) || '';
		if (header.includes(',')) header = `"${header}"`;
		header += ',';

		return text + header;
	}, '');

	const rows = tableData.map(row => columns.reduce((text, props) => {
		if (props.hidden && props.export !== true) return text;
		else if (props.export === false) return text;

		const cell = row[props.field];

		let cellText = props.csvFormat ? props.csvFormat(cell, row) : String(cell);
		if (cellText.includes(',')) cellText = `"${cellText}"`;
		cellText += ',';
		return text + cellText;
	}));

	return [csvHead, ...rows].reduce(
		(file, line) => `${file}${line.slice(0, -1)}\n`
	);
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

export default function exportToCSV(tableData, columns, filename) {
	download(filename, toCSV(tableData, columns));
}
