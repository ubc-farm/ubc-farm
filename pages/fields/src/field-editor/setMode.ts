/* eslint-disable no-use-before-define */
import { MapControlsProps } from './controls';

/*
 * Uses state machine to change the editing mode of the map.
 */

export const VIEWING = Symbol('EditorMode.VIEWING');
export const DRAWING = Symbol('EditorMode.DRAWING');
export const EDITING = Symbol('EditorMode.EDITING');
export const DELETING = Symbol('EditorMode.DELETING');

interface SetModeProps {
	renderControls: (props: MapControlsProps) => void;
	data: google.maps.Data;
	handleChange: (a: google.maps.Data.Feature | null) => void;
};

/**
 * Viewing mode disables drawing on the map, and will switch to editing mode
 * if a polygon is double clicked
 */
function useViewingMode(props: SetModeProps) {
	const { data } = props;

	data.setDrawingMode(null as any);
	const listener = data.addListener(
		'dblclick', () => setMode(EDITING, props));

	return function clearViewingMode() {
		listener.remove();
	};
}

/**
 * Drawing mode lets the user draw a new polygon representing a field.
 * Once a feature is drawn, the mode switches to viewing.
 */
function useDrawingMode(props: SetModeProps) {
	const { data, handleChange } = props;

	data.setDrawingMode('Polygon');
	const listener = data.addListener('addfeature', ({ feature }) => {
		handleChange(feature);
		setMode(VIEWING, props);
	});

	return function clearDrawingMode() {
		listener.remove();
	};
}

/**
 * Editing mode disables drawing new fields but adds handles to existing fields.
 * This mode is never automatically left, the user needs to disable it.
 */
function useEditingMode(props: SetModeProps) {
	const { data, handleChange } = props;

	data.setDrawingMode(null as any);
	data.forEach(field => field.setProperty('editable', true));
	const listener = data.addListener('setgeometry', ({ feature }) => {
		handleChange(feature);
	});

	return function clearEditingMode() {
		listener.remove();
		data.forEach(field => field.setProperty('editable', false));
	};
}

/**
 * Deleting mode disables drawing and listens for a click event on a polygon.
 * Once clicked, the polygon is deleted. Additionally, it adds a hover effect
 * to all polygons in the map.
 */
function useDeletingMode(props: SetModeProps) {
	const { data, handleChange } = props;

	data.setDrawingMode(null as any);
	const listeners = [
		data.addListener('click', ({ feature }) => {
			data.remove(feature);
			handleChange(null);
			setMode(VIEWING, props);
		}),
		data.addListener('mouseover', ({ feature }) => feature.setProperty('deleted', true)),
		data.addListener('mouseout', ({ feature }) => feature.setProperty('deleted', false)),
	];

	return function clearDeletingMode() {
		listeners.forEach(listener => listener.remove());
	};
}

let exitCallback = () => {};

/**
 * A function used to set the control mode in the map, out of
 * 'VIEWING', 'DRAWING', 'EDITING', and 'DELETING'. The mode can be
 * altered by the user using control buttons rendered on the map.
 *
 * setMode calls an exit callback set by the last used mode to handle
 * cleanup, then runs a function corresponding to the next desired mode.
 * The map controls are re-rendered using React.
 * Additionally, a props object gets passed around to keep track of useful
 * tools for the various functions and React controls.
 */
export default function setMode(mode = VIEWING, props: SetModeProps) {
	const { renderControls } = props;

	exitCallback();
	renderControls({ mode, setMode: newMode => setMode(newMode, props) });

	switch (mode) {
		case VIEWING:
			exitCallback = useViewingMode(props);
			break;
		case DRAWING:
			exitCallback = useDrawingMode(props);
			break;
		case EDITING:
			exitCallback = useEditingMode(props);
			break;
		case DELETING:
			exitCallback = useDeletingMode(props);
			break;
		default:
			exitCallback = () => {};
			break;
	}
}
