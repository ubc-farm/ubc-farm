import { observeStore } from 'ubc-farm-utils';
import { cellSelector } from '../../redux/selectors.js';
import { isGridCell } from '../utils/index.js';

/**
 * Usually activates after build-grid is called
 */
export default function replaceAllGridCells(store, mapData) {
	/**
	 * Replaces all grid cells in the map with the new set given
	 * @param {GeoJSON.FeatureCollection} newCells
	 */
	function replaceCells(newCells) {
		mapData.forEach(feature => {
			if (isGridCell(feature)) mapData.remove(feature);
		});

		return mapData.addGeoJson(newCells);
	}

	return observeStore(store, cellSelector, replaceCells);
}
