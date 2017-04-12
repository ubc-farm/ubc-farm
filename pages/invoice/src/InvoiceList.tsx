import { createElement } from 'react';
import { getInvoices } from '@ubc-farm/databases';
import { render } from 'react-dom';
import { parsed } from 'document-promises';
import { createList } from '@ubc-farm/database-utils';

import 'react-table/react-table.css'

const columns = [
	{
		name: 'ID',
		accessor: '_id'
	}
];

export default async function main() {
	const listReady = getInvoices().then(db => createList(db));
	const [List] = await Promise.all([listReady, parsed]);

	render(
		createElement(List, { columns }),
		document.getElementById('reactRoot')
	);
}
