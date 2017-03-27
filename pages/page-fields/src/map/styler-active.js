import { field } from './style.js';
import { activeProp } from './connect-redux.js';

/** @returns {boolean} is this feature marked active */
export function isActive(feature) {
	return Boolean(feature.getProperty(activeProp));
}

const selectedStyle = Object.assign({}, field.normal, field.selected);

/**
 * Used by data.setStyle. Applies fieldStyle.selected or fieldStyle.normal,
 * depending on if the activeProp is present.
 */
export default function styleActiveField(feature) {
	if (feature.getProperty(activeProp)) return selectedStyle;
	return field.normal;
}
