import {createSelector} from 'reselect';

export const activeSelector = state => state.active;
export const resizableSelector = state => state.resizable;
export const addModeSelector = state => state.mapMeta.adding;
export const loadingSelector = state => state.loading;

export const cellStateSelector = state => state.cells;
export const cellSelector = createSelector(
	cellStateSelector,
	cells => cells.geojson
);
export const cellParentSelctor = createSelector(
	cellStateSelector,
	cells => cells.parent
);

export const gridSelector = state => state.grids;
export const activeGridSelector = createSelector(
	activeSelector,
	gridSelector,
	(active, gridMap) => gridMap.get(active)
);

export const currentLoadingSelector = createSelector(
	activeSelector,
	loadingSelector,
	(active, loading) => loading.has(active)
)