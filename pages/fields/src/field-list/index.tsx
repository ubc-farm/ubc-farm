import { createElement } from 'react'; /** @jsx createElement */
import { render } from 'react-dom';
import { connectAll, Field } from '@ubc-farm/databases';
import { pick } from 'lodash';
import FieldList from './FieldList';

const connectToFields = connectAll<Field, {}>(
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
		useArray: true,
	},
);

/**
 * Renders the field list using values from the location database.
 * Doesn't need to be called again - the database automatically updates the
 * state of the list
 */
export default function createFieldList(locationDB: PouchDB.Database<Field>) {
	const ConnectedFieldList = connectToFields(FieldList);

	render(<ConnectedFieldList db={locationDB} />, document.getElementById('reactRoot'));
}
