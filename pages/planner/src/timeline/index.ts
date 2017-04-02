import { Store } from 'redux';
import { Task, TaskType, Location } from '@ubc-farm/databases';
import { IdType } from 'vis';

import { observeStore } from '@ubc-farm/utils';
import { setSelected, getAllSelected } from '../reducer/selected';
import { IState } from '../reducer/'
import createTimeline from './createTimeline';
import addDragListeners from './addDragListeners';

type SelectProperties = { items: IdType[], event: MouseEvent };

export default async function setupPlannerTimeline(
	store: Store<IState>,
	databases: {
		tasks: PouchDB.Database<Task>,
		taskTypes: PouchDB.Database<TaskType>,
		locations: PouchDB.Database<Location>,
	},
) {
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

	const removeDrag = addDragListeners(timeline, items, tasks);

	return function cancelListeners() {
		cancel();
		unsub();
		timeline.off('select', <any> handleSelect);
		removeDrag();
	};
}
