import { parsed } from 'document-promises';
import { getLocations } from '@ubc-farm/databases';
import setupMap from '../src/googlemaps/index';
import createFieldList from '../src/field-list/index';

Promise.all([getLocations(), parsed]).then(([db]) => {
	setupMap(db);
	createFieldList(db);
});
