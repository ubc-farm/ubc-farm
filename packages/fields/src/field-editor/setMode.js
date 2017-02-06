/* eslint-disable no-use-before-define */

import createControls from './controls.jsx';

/*
 * Uses state machine to change the editing mode of the map.
 */

export const VIEWING = Symbol('EditorMode.VIEWING');
export const DRAWING = Symbol('EditorMode.DRAWING');
export const EDITING = Symbol('EditorMode.EDITING');
export const DELETING = Symbol('EditorMode.DELETING');


function useViewingMode(props) {
	const { data } = props;

	data.setDrawingMode(null);
	const listener = data.addListener(
		'dblclick', () => setMode(EDITING, props));

	return function clearViewingMode() {
		listener.remove();
	};
}

function useDrawingMode(props) {
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

function useEditingMode(props) {
	const { data, handleChange } = props;

	data.setDrawingMode(null);
	data.forEach(field => field.setProperty('editable', true));
	const listener = data.addListener('setgeometry', ({ feature }) => {
		handleChange(feature);
	});

	return function clearEditingMode() {
		listener.remove();
		data.forEach(field => field.setProperty('editable', false));
	};
}

function useDeletingMode(props) {
	const { data, handleChange } = props;

	data.setDrawingMode(null);
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

let callback = () => {};
export default function setMode(mode = VIEWING, props) {
	const { renderControls } = props;

	callback();
	renderControls({ mode, setMode: newMode => setMode(newMode, props) });

	switch (mode) {
		case VIEWING:
			callback = useViewingMode(props);
			break;
		case DRAWING:
			callback = useDrawingMode(props);
			break;
		case EDITING:
			callback = useEditingMode(props);
			break;
		case DELETING:
			callback = useDeletingMode(props);
			break;
		default:
			callback = () => {};
			break;
	}
}
