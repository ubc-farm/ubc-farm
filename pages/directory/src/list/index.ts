import { createElement } from 'react';
import { render } from 'react-dom';
import { parsed } from 'document-promises';
import { getPeople } from '@ubc-farm/databases';
import { configureStore } from '@ubc-farm/database-utils';
import { connect } from 'react-redux';
import PeopleList from './PeopleList';

const ConnectedPeopleList = connect(
	state => ({ data: state.data })
)(PeopleList);

export default async function createPeopleList() {
	const [db] = await Promise.all([getPeople(), parsed]);
	const store = configureStore(db, {
		changeFilter(doc) { return !doc._id.startsWith('_design/'); }
	});

	render(
		createElement(ConnectedPeopleList, { store }),
		document.getElementById('reactRoot'),
	);
}
