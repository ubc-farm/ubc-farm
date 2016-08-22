import { createElement } from 'react'; /** @jsx createElement */
import ReactDOM from 'react-dom';
import { domready } from 'ubc-farm-utils';
import { Table } from 'ubc-farm-table-base';

import * as columns from './item-columns.js';

const apiData = fetch('/api/items').then(data => {
	function buildRow(obj) {
		const row = new WeakMap();
		for (const key in obj) {
			if (key in columns) row.set(columns[key], obj[key]);
		}
		return row;
	}

	const entries = Object.keys(data).then(key => {
		const value = buildRow(data[key]);
		return [key, value];
	});

	return new Map(entries);
})

Promise.all([apiData, domready]).then(([data]) => {
	ReactDOM.render(
		<Table
			selection sorting
			data={data} columns={columns.default}
			className="items-table"
		/>,
		document.getElementById('app-mount')
	);
});
