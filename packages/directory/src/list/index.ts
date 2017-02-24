import { createElement } from 'react';
import { render } from 'react-dom';
import { parsed } from 'document-promises';
import { connectAll, getPeople } from '@ubc-farm/databases';
import PeopleList from './PeopleList';

const Connected = connectAll({ useMap: true })(PeopleList);

export default async function createPeopleList() {
	const [db] = await Promise.all([getPeople(), parsed]);

	render(createElement(Connected, { db }), document.getElementById('reactRoot'));
}
