/* global google */
import { isGridCell } from './filter.js';

/**
 * Adds functionality to 'select' polygons when mousing over them
 * while the mouse button is down.
 */

let rightMouseDown = false;
let modifierKeyDown = false;

/**
 * Handle mouseover event
 * @param {Data.MouseEvent} e
 * @param {Data.Feature} e.feature
 */
function handleMouseOver({ feature }) {
	if (rightMouseDown && isGridCell(feature)) {
		const featureSelected = feature.getProperty('selected');
		if (modifierKeyDown && featureSelected) {
			feature.setProperty('selected', false);
		}	else if (!modifierKeyDown && !featureSelected) {
			feature.setProperty('selected', true);
		}
	}
}

/** @type {google.maps.MapsEventListener|undefined} */
let mouseOverListener;
/** Destroys the mouse over listener if it exists */
function destroyMouseOverListener() {
	if (mouseOverListener) {
		mouseOverListener.remove();
		mouseOverListener = undefined;
	}
}

let createMouseOverListener;

/**
 * Responds to a mousedown event by tracking the right button
 * and activating the mouseOverListener.
 * @param {MouseEvent} e
 * @param {number} e.button
 * @param {boolean} e.ctrlKey
 */
function handleRightMouseDown({ button, ctrlKey }) {
	if (button === 2) {
		rightMouseDown = true;
		modifierKeyDown = ctrlKey;

		try {
			createMouseOverListener();
		} catch (err) {
			if (!(err instanceof TypeError)) throw err;
		}
	}
}

/**
 * Responds to a mouseup event by tracking the right button
 * and removing the mouseOverListener.
 * @param {MouseEvent} e
 * @param {number} e.button
 */
function handleRightMouseUp({ button }) {
	if (button === 2) {
		rightMouseDown = false;
		destroyMouseOverListener();
	}
}

/** Removes all event listeners */
function flush() {
	destroyMouseOverListener();
	window.removeEventListener('mousedown', handleRightMouseDown);
	window.removeEventListener('mouseup', handleRightMouseUp);
	rightMouseDown = false;
}

/**
 * Creates event listeners.
 * Two params are used to match the other listener initializers,
 * but the redux store isn't used here so both parameters can be
 * used for mapData.
 * @param {google.maps.Data} mapData
 * @returns {function} invoke to destory listeners
 */
export default function init(alsoMapData, mapData = alsoMapData) {
	rightMouseDown = false; modifierKeyDown = false;

	/** Creates a mouse over listener if needed. */
	createMouseOverListener = function buildMouseOverListener() {
		if (mouseOverListener !== undefined) return mouseOverListener;

		mouseOverListener = google.maps.event.addListener(
			mapData, 'mouseover',
			handleMouseOver
		);

		return mouseOverListener;
	};

	window.addEventListener('mousedown', handleRightMouseDown);
	window.addEventListener('mouseup', handleRightMouseUp);

	return flush;
}
