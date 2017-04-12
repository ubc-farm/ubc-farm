import { createElement } from 'react';
import { getPeople } from '@ubc-farm/databases';
import { render } from 'react-dom';
import { parsed } from 'document-promises';
import createList from './createList';
import columns from './columns';

export default async function main() {
	const listReady = getPeople().then(db => createList(db));
	const [List] = await Promise.all([listReady, parsed]);

	render(
		createElement(List, { columns }),
		document.getElementById('reactRoot')
	);
}


