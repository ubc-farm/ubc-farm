import store from '../redux/index.js';
import { addTask, setTaskType } from '../redux/actions/index.js';

export function handleDragOver(e) {
	e.preventDefault();
	e.dataTransfer.effectAllowed = 'all';
}

export function handleDrop(timeline, e) {
	e.preventDefault();
	const text = e.dataTransfer.getData('text/plain');
	const eventProps = timeline.getEventProperties(e);

	switch (eventProps.what) {
		case 'background': {
			const { group, snappedTime } = eventProps;
			const props = { locationId: group, start_time: snappedTime };
			store.dispatch(addTask(undefined, props));
			break;
		}
		case 'item': {
			const { item } = eventProps;
			store.dispatch(setTaskType(item, text));
			break;
		}

		default: break;
	}
}

/**
 * Initialize drag listeners
 * @param {vis.Timeline} Timeline
 * @returns {function} call to remove listeners
 */
export default function init(timeline) {
	const element = timeline.dom.center;
	const ondrop = handleDrop.bind(undefined, timeline);

	element.addEventListener('dragover', handleDragOver);
	element.addEventListener('drop', ondrop);

	return function removeDragListeners() {
		element.removeEventListener('dragover', handleDragOver);
		element.removeEventListener('drop', ondrop);
	};
}
