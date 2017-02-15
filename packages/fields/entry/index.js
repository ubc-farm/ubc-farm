import { parsed } from 'document-promises';
import { locations } from '@ubc-farm/databases';
import setupMap from '../src/googlemaps/index.js';
import createFieldList from '../src/field-list/index.jsx';

Promise.all([locations, parsed]).then(([db]) => {
	setupMap(db);
	createFieldList(db);
});
