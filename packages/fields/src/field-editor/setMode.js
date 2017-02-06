/* eslint-disable no-use-before-define */

/*
 * Uses state machine to change the editing mode of the map.
 */

export const VIEWING = Symbol('EditorMode.VIEWING');
export const DRAWING = Symbol('EditorMode.DRAWING');
export const EDITING = Symbol('EditorMode.EDITING');
export const DELETING = Symbol('EditorMode.DELETING');


function useViewingMode(data, handleChange) {
	data.setDrawingMode(null);
	const listener = data.addListener(
		'dblclick', () => setMode(data, handleChange, EDITING));

	return function clearViewingMode() {
		listener.remove();
	};
}

function useDrawingMode(data, handleChange) {
	data.setDrawingMode('Polygon');
	const listener = data.addListener('addfeature', (field) => {
		handleChange(field);
		setMode(data, handleChange, VIEWING);
	});

	return function clearDrawingMode() {
		listener.remove();
	};
}

function useEditingMode(data, handleChange) {
	data.setDrawingMode(null);
	data.forEach(field => field.setProperty('editable', true));

	const listener = data.addListener('setgeometry', handleChange);

	return function clearEditingMode() {
		listener.remove();
		data.forEach(field => field.setProperty('editable', false));
	};
}

function useDeletingMode(data, handleChange) {
	data.setDrawingMode(null);
	const listeners = [
		data.addListener('click', (feature) => {
			data.remove(feature);
			handleChange(null);
			setMode(data, handleChange, VIEWING);
		}),
		data.addListener('mouseover', feature => feature.setProperty('deleted', true)),
		data.addListener('mouseout', feature => feature.setProperty('deleted', false)),
	];

	return function clearDeletingMode() {
		listeners.forEach(listener => listener.remove());
	};
}

let callback = () => {};
export default function setMode(data, handleChange, mode = VIEWING) {
	callback();
	switch (mode) {
		case VIEWING:
			callback = useViewingMode(data);
			break;
		case DRAWING:
			callback = useDrawingMode(data);
			break;
		case EDITING:
			callback = useEditingMode(data);
			break;
		case DELETING:
			callback = useDeletingMode(data);
			break;
		default:
			callback = () => {};
			break;
	}
}
