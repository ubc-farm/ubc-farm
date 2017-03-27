import { observeStore } from 'ubc-farm-utils';
import { gridSelector } from '../../redux/selectors.js';

export default function gridPropertyUpdater(store, mapData) {
	return observeStore(
		store, gridSelector,
		(newGridCache, oldGridCache = new Map()) => {
			for (const key of oldGridCache.keys()) {
				if (!newGridCache.has(key)) {
					const feature = mapData.getFeatureById(key);
					feature.removeProperty('grid');
				}
			}
			for (const [id, value] of newGridCache) {
				const feature = mapData.getFeatureById(id);
				if (feature) feature.setProperty('grid', value);
			}
		}
	);
}
