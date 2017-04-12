import { createElement } from 'react';
import { render } from 'react-dom';
import { parsed } from 'document-promises';
import { configureStore } from '@ubc-farm/database-utils';
import { connect } from 'react-redux';
import ReactTable from 'react-table';

const ConnectedTable = connect(
	state => ({ data: state.data || [] })
)(ReactTable);

/**
 * @param {Promise<PouchDB>} database
 * @param {object} props
 */
export default async function createList(database, props) {
	const [db] = await Promise.all([database, parsed]);
	const store = configureStore(db, {
		changeFilter(doc) { return !doc._id.startsWith('_design/'); }
	});

	render(
		createElement(ConnectedTable, Object.assign({ store }, props)),
		document.getElementById('reactRoot'),
	);
}
