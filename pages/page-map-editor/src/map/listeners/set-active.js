import watchActive from 'ubc-farm-page-fields/src/map/connector.js';

export default function activeListener(store, mapData) {
	return watchActive(mapData, store);
}
