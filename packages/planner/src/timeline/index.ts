import PouchDB from 'pouchdb';
import { Task } from '@ubc-farm/databases';
import { DataItem, IdType } from 'vis';

import { observeStore } from '@ubc-farm/utils';
import { setSelected, getAllSelected } from '../reducer/selected';
import createTimeline, { handleAddItem, handleTypeChange } from './createTimeline';
import addDragListeners from './addDragListeners';

type SelectProperties = { items: IdType[], event: MouseEvent };

export default async function setupPlannerTimeline(store, databases) {
	const { tasks } = databases;
	const { timeline, items, cancel } = await createTimeline(databases);

	const unsub = observeStore(
		store, getAllSelected,
		timeline.setSelection.bind(timeline),
	);

	function handleSelect(props: SelectProperties) {
		const items = props.items.map(item => item.toString());
		store.dispatch(setSelected(items));
	}
	timeline.on('select', handleSelect);

	const removeDrag = addDragListeners(timeline, items);

	return function cancelListeners() {
		cancel();
		unsub();
		timeline.off('select', handleSelect);
		removeDrag();
	};
}
