import { Timeline, DataItem, DataSet, DataGroup } from 'vis';

import { handleAddItem, handleTypeChange } from './createTimeline';

function handleDragOver(e: DragEvent) {
	e.preventDefault();
	e.dataTransfer.effectAllowed = 'all';
}

export default function addDragListeners(
	timeline: Timeline,
	items: DataSet<DataItem>,
) {
	const element = timeline.dom.center;

	/**
	 * Handles drop event from task types on timeline.
	 * If dropped in the timeline's blank area, a task of that type is added.
	 * If dropped ontop of an existing task, the task type is changed.
	 */
	function handleDrop(e: DragEvent) {
		e.preventDefault();
		const text = e.dataTransfer.getData('text/plain');
		const { what, snappedTime, item: itemID, group } = timeline.getEventProperties(e);

		switch (what) {
			case 'background':
				handleAddItem({
					content: text,
					className: group ? group.toString() : undefined,
					start: snappedTime.valueOf(),
					type: text,
				}, editedItem => { if (editedItem) items.add(editedItem, 'drop') });
				break;

			case 'item': {
				if (!itemID) return;
				const item = items.get(itemID);
				if (item.content === item.className) item.content = text;
				item.className = text;
				handleTypeChange(item,
					editedItem => { if (editedItem) items.update(editedItem, 'drop') });
				break;
			}
		}
	}

	element.addEventListener('dragover', handleDragOver);
	element.addEventListener('drop', handleDrop);

	return function removeDragListeners() {
		element.removeEventListener('dragover', handleDragOver);
		element.removeEventListener('drop', handleDrop);
	};
}
