import createMap from './createMap.js';
import importFields from './importFields.js';
import createInfoWindow from './infoWindow.js';
import watchDblClick from './watchDblClick.js';

export default function setupMap(fields) {
	const map = createMap();
	importFields(fields, map.data);
	createInfoWindow(map.data);
	watchDblClick(map.data);
}
