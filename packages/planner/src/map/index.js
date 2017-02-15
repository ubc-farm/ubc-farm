import locations from '@ubc-farm/databases/src/locations.js';
import { observeStore } from '@ubc-farm/utils';
import createPlanningMap from './createPlanningMap.js';
import { toggleSelected, getAllSelected } from '../reducer/selected.js';

/**
 * Attaches google map to the given store and location database
 */
export default function attachMap(store) {
	const setSelected = createPlanningMap(
		id => store.dispatch(toggleSelected(id)),
		locations,
	);

	const unsub = observeStore(store, getAllSelected, setSelected);

	return function removeListeners() { setSelected.removeListeners(); unsub(); };
}
