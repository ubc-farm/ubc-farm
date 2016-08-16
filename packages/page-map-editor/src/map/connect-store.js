import {createSelector} from 'reselect';
import {observeStore} from 'ubc-farm-utils';
import watchActive from 'ubc-farm-page-fields/map/connector.js';

import {
	activeSelector, 
	resizableSelector,
	addModeSelector,
	loadingSelector,
	cellSelector,
	activeGridSelector
} from '../redux/selectors.js';
import {isGridCell} from './filter.js';

export function activeListener(store) {
	return watchActive(store);
}

const drawingModeSelector = createSelector(
	addModeSelector,
	isAddingMode => isAddingMode ? 'Polygon' : null
);

/** Updates drawing mode */
export function updateDrawingModeListener(store, mapData) {
	return observeStore(
		store, drawingModeSelector,
		drawingMode => mapData.setDrawingMode(drawingMode)
	);
}

/** Replaces grid cells on update */
export function newCellSetListener(store, mapData) {
	function replaceCells(newCells) {
		mapData.forEach(feature => {
			if (isGridCell(feature)) mapData.remove(feature);
		});

		return mapData.addGeoJson(newCells);
	}

	return observeStore(store, cellSelector, replaceCells);
}

const gridDataActiveCombined = createSelector(
	activeSelector,
	activeGridSelector,
	(active, grid) => {active, grid}
);

export function gridFormListener(store, mapData) {
	return observeStore(
		store, gridDataActiveCombined,
		({active, grid}) => {
			const feature = mapData.getFeatureById(active);
			if (feature) feature.setProperty('grid', grid);
		}
	)
}

export function resizableListener(store, mapData) {
	return observeStore(
		store, resizableSelector,
		(newResizeable, lastResizable) => {
			const last = mapData.getFeatureById(newResizeable);
			const next = mapData.getFeatureById(lastResizable);

			if (last) last.removeProperty('resizable');
			if (next) next.setProperty('resizable', true);
		}
	);
}

export function loadingListener(store, mapData) {
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

export default function startAllListeners(store, mapData) {
	return [
		activeListener,
		updateDrawingModeListener,
		newCellSetListener,
		gridFormListener,
		resizableListener,
		loadingListener
	]
	.map(listener => listener(store, mapData));
}