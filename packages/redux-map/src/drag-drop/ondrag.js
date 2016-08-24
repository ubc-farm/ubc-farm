import Timeline from '../timeline/index.js';
import store from '../redux/index.js';
import { addTask, setTaskType } from '../redux/actions/index.js';

export function handleDragOver(e) {
	e.preventDefault();
	e.dataTransfer.effectAllowed = 'all';
}

export function handleDrop(e) {
	e.preventDefault();
	const text = e.dataTransfer.getData('text/plain');
	const eventProps = Timeline.getEventProperties(e);

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

export default function init() {
	const element = Timeline.dom.center;
	element.addEventListener('dragover', handleDragOver);
	element.addEventListener('drop', handleDrop);
}
