import store from '../redux/index.js';
import { setSelected } from '../redux/actions/index.js';

import { observeStore } from 'ubc-farm-utils';
import { selectedTask } from '../redux/selectors.js';

export default function onSelect({ items }) {
	const [selected] = items;
	store.dispatch(setSelected(selected, 'timeline'));
}

function updateSelectedItem(timeline, newSelected) {
	if (newSelected == null) timeline.setSelection([]);
	else timeline.setSelection(newSelected);
}

export function init(timeline) {
	return observeStore(
		store,
		selectedTask,
		updateSelectedItem.bind(undefined, timeline)
	);
}
