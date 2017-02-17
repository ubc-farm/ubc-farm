import { observeStore } from '@ubc-farm/utils';
import { setSelected, getAllSelected } from '../reducer/selected.js';
import createTimeline, { handleAddItem } from './createTimeline.js';
import addDragListeners from './addDragListeners.js';

async function handleTypeChange({ id }, type) {
	const db = this;
	const task = db.get(id);

	task.type = type;
	return db.put(task);
}

/**
 * @param {redux.Store} store
 */
export default function setupPlannerTimeline(store, { tasks, taskTypes, locations }) {
	const timeline = createTimeline(store, { tasks, taskTypes, locations });
	const handleAdd = handleAddItem.bind(tasks);

	const unsub = observeStore(
		store, getAllSelected,
		timeline.setSelection.bind(timeline),
	);

	const handleSelect = props => store.dispatch(setSelected(props.items));
	timeline.on('select', handleSelect);


	const removeDrag = addDragListeners(
		timeline,
		handleAdd,
		handleTypeChange.bind(tasks),
	);

	return function cancel() {
		unsub();
		timeline.off('select', handleSelect);
		removeDrag();
	};
}
