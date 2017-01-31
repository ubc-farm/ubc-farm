import { observeStore } from 'ubc-farm-utils';
import { addModeSelector } from '../../redux/selectors.js';

/** Updates drawing mode */
export default function updateDrawingModeListener(store, mapData) {
	return observeStore(
		store, addModeSelector,
		adding => mapData.setDrawingMode(adding ? 'Polygon' : null)
	);
}
