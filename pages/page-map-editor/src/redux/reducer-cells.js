import {OVERWRITE_CELLS} from './actions.js'

const defaultState = {
	parent: undefined,
	geojson: {
		type: 'FeatureCollection',
		features: []
	}
}

export default function cells(state = defaultState, action) {
	if (action.type === OVERWRITE_CELLS) {
		const {meta: parent, error} = action;
		const {payload: geojson = defaultState.geojson} = action;

		if (error) {
			console.error(error);
			return state;
		} else {
			return Object.assign({}, state, { parent, geojson });
		}
	} else {
		return state;
	}
}