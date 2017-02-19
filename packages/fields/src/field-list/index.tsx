import { createElement } from 'react'; /** @jsx createElement */
import { render } from 'react-dom';
import { connectAll } from '@ubc-farm/databases';
import { PouchDB } from 'pouchdb';
import pick from 'lodash/pick';
import FieldList from './FieldList';

const connectToFields = connectAll(
	(doc) => {
		if (!doc._id.startsWith('fields/')) return null;
		return pick(doc, '_id', 'name', 'geometry', 'crop');
	},
	{
		allDocsOptions: {
			include_docs: true,
			startkey: 'fields/',
			endkey: 'fields/\uffff',
		},
		useMap: true,
	},
);

const mapValues = ReactComponent =>
	({ rows }) => <ReactComponent rows={[...rows.values()]} />;

/**
 * Renders the field list using values from the location database.
 * Doesn't need to be called again - the database automatically updates the
 * state of the list
 */
export default function createFieldList(locationDB: PouchDB) {
	const ConnectedFieldList = connectToFields(mapValues(FieldList));

	render(<ConnectedFieldList db={locationDB} />, document.getElementById('reactRoot'));
}
