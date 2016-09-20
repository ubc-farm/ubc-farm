import { createSelector } from 'reselect';

export const activeSelector = state => state.active;

export const editingActiveSelector = state => state.mapMeta.editingActive;
export const addingModeSelector = state => state.mapMeta.addingMode;

export const loadingListSelector = state => state.mapMeta.loadingList;

export const currentLoadingSelector = createSelector(
	activeSelector,
	loadingListSelector,
	(active, loadingList) => loadingList.has(active)
);
