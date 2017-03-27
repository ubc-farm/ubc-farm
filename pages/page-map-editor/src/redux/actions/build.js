import worker from '../../worker/worker.js';
import { data as mapData } from '../../map/map.js';
import { toGeoJson } from '../../map/utils/index.js';

import { cellParentSelctor,	activeSelector } from '../selectors.js';
import { setSelected,	setDataLoading,	overwriteCells } from './index.js';

export function buildGrid() {
	return (dispatch, getState) => {
		const polyID = activeSelector(getState());
		if (polyID === '') return Promise.resolve(undefined);

		const currentGrid = cellParentSelctor(getState());
		if (currentGrid === polyID) return Promise.resolve(undefined);

		dispatch(setDataLoading(polyID, true));
		const polygon = mapData.getFeatureById(polyID);

		return toGeoJson(polygon)
			.then(feature => worker.postMessage({ feature }))
			.then(features => {
				dispatch(overwriteCells(polyID, features));
				dispatch(setDataLoading(polyID, false));
				dispatch(setSelected(polyID));
			})
			.catch(err => dispatch(overwriteCells(polyID, undefined, err)));
	};
}

export function activatePolygon(polyId) {
	return dispatch => {
		dispatch(setSelected(polyId));
		dispatch(buildGrid());
	};
}
