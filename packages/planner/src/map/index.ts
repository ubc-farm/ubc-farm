import { Location } from '@ubc-farm/databases';
import { Store } from 'redux';

import { observeStore } from '@ubc-farm/utils';
import createPlanningMap from './createPlanningMap';
import { toggleSelected, getAllSelected, IState } from '../reducer/selected';

/**
 * Attaches google map to the given store and location database
 */
export default function attachMap(
	store: Store<{ selected: IState }>,
	locationsDB: PouchDB.Database<Location>,
) {
	const { setSelected, removeListeners } = createPlanningMap(
		id => store.dispatch(toggleSelected(id)),
		locationsDB,
	);

	const unsub = observeStore(store, getAllSelected, setSelected);

	return function remove() { removeListeners(); unsub(); };
}
