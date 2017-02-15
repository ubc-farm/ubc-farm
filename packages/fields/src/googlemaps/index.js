import { createMap, observeDatabase, defaultToFeature } from '@ubc-farm/map-utils';
import createInfoWindow from './infoWindow.js';
import watchDblClick from './watchDblClick.js';

export default function setupMap(locationDB) {
	const map = createMap();
	observeDatabase(locationDB, map.data, {
		allDocsOptions: { include_docs: true, startkey: 'fields/', endkey: 'fields/' },
		toFeature(doc) {
			if (!doc._id.startsWith('fields/')) return null;
			return defaultToFeature(doc);
		},
	});
	createInfoWindow(map.data);
	watchDblClick(map.data);
}
