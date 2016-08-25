import store from '../redux/index.js';
import { setSelected } from '../redux/actions/index.js';

export default function onSelect([selected]) {
	store.dispatch(setSelected(selected, 'timeline'));
}
