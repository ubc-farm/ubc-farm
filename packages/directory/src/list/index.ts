import { createElement } from 'react';
import { render } from 'react-dom';
import { parsed } from 'document-promises';
import { connectAll, people } from '@ubc-farm/databases';
import PeopleList from './PeopleList';

const Connected = connectAll({ useMap: true })(PeopleList);

export default async function createPeopleList() {
	const [db] = await Promise.all([people, parsed]);

	render(createElement(Connected, { db }), document.getElementById('reactRoot'));
}
