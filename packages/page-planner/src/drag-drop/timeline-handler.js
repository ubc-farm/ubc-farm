import { addTask, updateTaskType } from './timeline-actions.js';

function handleDragOver(e) {
	e.preventDefault();
	e.dataTransfer.effectAllowed = 'all';
}

/**
 * Handler for drop event.
 * Bind the handler to the Timeline.
 * @param {DragEvent} e
 * @this Timeline
 */
function handleDrop(e) {
	e.preventDefault();
	const text = e.dataTransfer.getData('text/plain');
	const eventProps = this.getEventProperties(e);

	switch (eventProps.what) {
		case 'background': {
			const { group, snappedTime: time } = eventProps;
			addTask({
				content: 'new item',
			}, time, group, text, this.itemsData);
			break;
		}
		case 'item': {
			const { item } = eventProps;
			updateTaskType(text, item, this.itemsData);
			break;
		}
	}
}

export default function bindDragListeners(Timeline) {
	const element = Timeline.dom.center;
	element.addEventListener('dragover', handleDragOver);
	const bound = handleDrop.bind(Timeline);
	element.addEventListener('drop', bound);
}
