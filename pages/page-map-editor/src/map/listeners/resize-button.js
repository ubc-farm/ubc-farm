import { observeStore } from 'ubc-farm-utils';
import { resizableSelector } from '../../redux/selectors.js';

/**
 * Sets the resizable property based on the current state
 * The styler function then makes the resizable polygon
 * editable.
 */
export default function resizableChangeListener(store, mapData) {
	return observeStore(
		store, resizableSelector,
		(newResizeable, lastResizable) => {
			const last = mapData.getFeatureById(newResizeable);
			const next = mapData.getFeatureById(lastResizable);

			if (last) last.removeProperty('resizable');
			if (next) next.setProperty('resizable', true);
		}
	);
}
