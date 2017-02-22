import { parsed } from 'document-promises';
import { locations } from '@ubc-farm/databases';
import setupMap from '../src/googlemaps/index';
import createFieldList from '../src/field-list/index';

Promise.all([locations, parsed]).then(([db]) => {
	setupMap(db);
	createFieldList(db);
});
