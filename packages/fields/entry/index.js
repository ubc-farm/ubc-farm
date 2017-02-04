import { parsed } from 'document-promises';
import createMap from '../src/googlemaps/createMap.js';
import importFields from '../src/pouch/importFields.js';
import watchChanges from '../src/pouch/watchChanges.js';
import watchDblClick from '../src/googlemaps/watchDblClick.js';

const mapready = parsed
	.then(() => createMap())
	.then(map => map.data);

importFields(mapready);
watchChanges(mapready);
mapready.then(watchDblClick);
