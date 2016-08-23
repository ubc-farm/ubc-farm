import { fieldStyle,	gridStyle } from 'ubc-farm-page-fields/src/map/index.js';
import { isField, isGridCell } from './filter.js';

function gridCellStyler(feature) {
	const style = Object.assign({}, gridStyle.normal);

	if (feature.getProperty('selected')) {
		Object.assign(style, gridStyle.selected);
	}
	if (feature.getProperty('hover')) {
		Object.assign(style, fieldStyle.hover); // TODO: Check if correct
	}

	return style;
}

function fieldStyler(feature) {
	const style = Object.assign({}, fieldStyle.normal);

	if (feature.getProperty('activeField')) {
		Object.assign(style, fieldStyle.selected);
	}
	if (feature.getProperty('resizable')) {
		Object.assign(style, fieldStyle.resizable);
	}

	return style;
}

export default function startStyler(alsoMapData, mapData = alsoMapData) {
	mapData.setStyle(feature => {
		if (isGridCell(feature)) return gridCellStyler(feature);
		else if (isField(feature)) return fieldStyler(feature);

		return {}; // TODO: Add default style?
	});
}

