import { observeStore } from 'ubc-farm-utils';
import { loadingSelector } from '../../redux/selectors.js';

export default function loadingListener(store, mapData) {
	return observeStore(
		store, loadingSelector,
		(newLoadingList, oldLoadingList = new Set()) => {
			for (const key of oldLoadingList) {
				if (newLoadingList.has(key)) {
					const feature = mapData.getFeatureById(key);
					feature.removeProperty('loadingGrid');
				}
			}
			for (const id of newLoadingList) {
				const feature = mapData.getFeatureById(id);
				if (feature) feature.setProperty('loadingGrid', true);
			}
		}
	);
}
