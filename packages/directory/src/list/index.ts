import { createElement } from 'react';
import { render } from 'react-dom';
import { parsed } from 'document-promises';
import { people } from '@ubc-farm/databases';
import PeopleList from './PeopleList';

export default async function createPeopleList() {
	const [peopleDB] = await Promise.all([people, parsed]);

	const docs = await peopleDB.allDocs({ include_docs: true });
	const rows = docs.rows.map(row => row.doc);

	render(createElement(PeopleList, { rows }), document.getElementById('reactRoot'));
}
