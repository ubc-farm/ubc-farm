import { isGridCell } from '../map/utils/index.js';

/**
 * @returns {google.maps.Data.Feature[]} user-selected cells
 */
export default function getSelectedCells(mapData) {
	const list = [];
	mapData.forEach(feature => {
		if (isGridCell(feature) && feature.getProperty('selected')) {
			list.push(feature);
		}
	});

	return list;
}
