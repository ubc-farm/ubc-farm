import PouchDB from 'pouchdb';
import { createMap, observeDatabase, defaultToFeature } from '@ubc-farm/map-utils';
import createInfoWindow from './infoWindow';
import watchDblClick from './watchDblClick';

/**
 * Sets up the google map by connecting it to the database and adding
 * click (open infowindow) and double-click (open field page) listeners.
 */
export default function setupMap(locationDB: PouchDB) {
	const map = createMap();
	observeDatabase(locationDB, map.data, {
		allDocsOptions: { include_docs: true, startkey: 'fields/', endkey: 'fields/' },
		toFeature(doc) {
			if (!doc._id.startsWith('fields/')) return null;
			return defaultToFeature(doc);
		},
	});
	createInfoWindow(map.data, locationDB);
	watchDblClick(map.data);
}
