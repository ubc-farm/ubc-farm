import { id as randomID } from 'ubc-farm-utils';
import store from '../redux/index.js';
import { addTask } from '../redux/actions/index.js';

export default function onAdd(item, callback) {
	const id = randomID();
	item.id = id;

	store.dispatch(addTask(id));
	callback(item);
}
