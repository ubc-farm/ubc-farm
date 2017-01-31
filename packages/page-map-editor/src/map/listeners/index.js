import addButtonListener from './add-button.js';
import gridChangeListener from './built-grid.js';
import polygonClickListener from './clicked-polygon.js';
import gridPropertyUpdater from './form-property.js';
import markedAsLoadingListener from './marked-loading.js';
import resizeButtonListener from './resize-button.js';
import setAsActiveListener from './set-active.js';

const set = [
	addButtonListener,
	gridChangeListener,
	polygonClickListener,
	gridPropertyUpdater,
	markedAsLoadingListener,
	resizeButtonListener,
	setAsActiveListener,
];

export default function startAllListeners(store, mapData) {
	const removers = set.map(listener => listener(store, mapData));
	return function clearAll() {
		removers.forEach(unsubscribe => unsubscribe.call());
	};
}
