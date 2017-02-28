/// <reference path="../../../custom-types/document-promises/index.d.ts" />

import { createElement } from 'react';
import { render } from 'react-dom';
import { parsed } from 'document-promises';
import { getPeople } from '@ubc-farm/databases';
import PeopleList from './PeopleList';

export default async function createPeopleList() {
	const [db] = await Promise.all([getPeople(), parsed]);

	render(createElement(PeopleList, { db }), document.getElementById('reactRoot'));
}
