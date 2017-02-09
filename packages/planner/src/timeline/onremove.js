import store from '../redux/index.js';
import { deleteTask } from '../redux/actions/index.js';

export default function onRemove(item, callback) {
	const { id } = item;

	store.dispatch(deleteTask(id));

	// TODO: Delete from server
	callback(item);
}
