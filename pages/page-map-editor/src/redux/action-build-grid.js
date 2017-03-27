import PromiseWorker from 'promise-worker';

import map from '../map/map.js';
import toGeoJson from '../map/promise-tojson.js';

import {
	setSelected, setDataLoading,
	applyGridData, overwriteCells,
} from './actions.js';
import {
	cellParentSelctor,
	activeSelector,
	gridSelector,
} from './selectors.js';

export const GridWorker = new PromiseWorker('/js/page/map-editor/worker.js');

export default function buildGrid(polygonID, gridOptions) {
	return (dispatch, getState) => {
		const polyID = polygonID || activeSelector(getState());
		const currentGrid = cellParentSelctor(getState());

		if (currentGrid === polyID) {
			return Promise.resolve(undefined);
		}

		if (gridOptions) dispatch(applyGridData(polyID, gridOptions));
		const gridOpts = gridSelector(getState()).get(polyID);

		dispatch(setDataLoading(polyID, true));
		const polygon = map.data.getFeatureById(polyID);

		return toGeoJson(polygon)
			.then(feature => GridWorker.postMessage({ feature, gridOpts }))
			.then(features => {
				dispatch(overwriteCells(polyID, features));
				dispatch(setDataLoading(polyID, false));
				dispatch(setSelected(polyID));
			})
			.catch(err => dispatch(overwriteCells(polyID, undefined, err)));
	};
}
