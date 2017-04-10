import { createElement, SFC } from 'react';
import { render } from 'react-dom';
import { parsed } from 'document-promises';
import { getPeople, People } from '@ubc-farm/databases';
import PeopleList from './PeopleList';

function renderTable(data: People[]) {
	render(
		createElement(PeopleList, { data }),
		document.getElementById('reactRoot'),
	);
}

export default async function createPeopleList() {
	const peopleReady = getPeople();
	renderTable([]);

	const db = await peopleReady;
	const { rows } = await db.allDocs({
		include_docs: true,
		startkey: 'person/',
		endkey: 'person/\uffff',
	});

	renderTable(rows);
}
