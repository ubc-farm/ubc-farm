import store from '../redux/index.js';
import { setTaskLocation, setTimes } from '../redux/actions/index.js';

export default function onMove(item, callback) {
	const { id, start, end, group } = item;

	store.dispatch(setTaskLocation(id, group));
	store.dispatch(setTimes(id, start, end));

	callback(item);
}
