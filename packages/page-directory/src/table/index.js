import { createElement } from 'react'; /** @jsx createElement */
import ReactDOM from 'react-dom';
import { domready } from 'ubc-farm-utils';
import { Table } from 'ubc-farm-table-base';
import apiData from './get-api.js';
import columns from './columnlist.js';

Promise.all([apiData, domready]).then(([data]) => {
	ReactDOM.render(
		<Table
			selection sorting
			data={data} columns={columns}
			className="directory-table"
		/>,
		document.getElementById('app-mount')
	);
});
