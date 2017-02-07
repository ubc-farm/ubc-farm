import { parsed } from 'document-promises';
import db from '../src/db.js';
import setupMap from '../src/googlemaps/index.js';
import createFieldList from '../src/field-list/index.jsx';

const fields = db.allDocs({ include_docs: true })
	.then(res => res.rows.map(row => row.doc));

parsed.then(() => {
	setupMap(fields);
	createFieldList(fields);
});
