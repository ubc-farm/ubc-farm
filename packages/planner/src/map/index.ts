import { Location } from '@ubc-farm/databases';
import { Store } from 'redux';
import PouchDB from 'pouchdb';

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
	const setSelected = createPlanningMap(
		id => store.dispatch(toggleSelected(id)),
		locationsDB,
	);

	const unsub = observeStore(store, getAllSelected, setSelected);

	return function removeListeners() { setSelected.removeListeners(); unsub(); };
}
