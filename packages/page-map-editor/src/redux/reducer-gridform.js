import defaultGrid from '../map/grid-default.js';
import {APPLY_GRID_DATA} from './actions.js'

export default function gridForm(state = new Map(), action) {
	if (action.type === APPLY_GRID_DATA) {
		const {meta: id, payload: grid} = action;
		let clone = new Map(state);

		const subState = clone.get(id) || defaultGrid;
		const newSubState = Object.assign({}, subState, grid);

		return clone.set(id, newSubState);
	} else {
		return state;
	}
}