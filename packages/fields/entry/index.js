import { parsed } from 'document-promises';
import db from '@ubc-farm/databases/src/locations.js';
import setupMap from '../src/googlemaps/index.js';
import createFieldList from '../src/field-list/index.jsx';

parsed.then(() => {
	setupMap(db);
	createFieldList(db);
});
