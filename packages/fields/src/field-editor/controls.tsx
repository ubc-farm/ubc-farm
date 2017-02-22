import { createElement, PropTypes, MouseEventHandler, StatelessComponent } from 'react';
/** @jsx createElement */
import { render } from 'react-dom';
import { VIEWING, DRAWING, EDITING, DELETING } from './setMode';

const { ControlPosition } = google.maps;

type ButtonProps = {
	onClick: MouseEventHandler;
	pressed?: boolean;
};

const PanButton = ({ onClick }: ButtonProps) => (
	<button onClick={onClick} className="map-button map-button-pan" title="Pan" />
);
const DrawButton = ({ onClick }: ButtonProps) => (
	<button onClick={onClick} className="map-button map-button-draw" title="Draw" />
);
const EditButton = ({ onClick, pressed }: ButtonProps) => (
	<button
		onClick={onClick} title="Edit"
		className="map-button map-button-edit"
		aria-pressed={pressed ? 'true' : 'false'}
	/>
);
const DeleteButton = ({ onClick, pressed }: ButtonProps) => (
	<button
		onClick={onClick} title="Delete"
		className="map-button map-button-delete"
		aria-pressed={pressed ? 'true' : 'false'}
	/>
);

export interface MapControlsProps {
	mode: symbol;
	setMode: (newMode: symbol) => void;
	hasField?: boolean;
};

export const MapControls: StatelessComponent = ({ mode, setMode, hasField }: MapControlsProps) => {
	let children = null;
	if (!hasField) {
		if (mode === VIEWING) children = <DrawButton onClick={() => setMode(DRAWING)} />;
		else children = <PanButton onClick={() => setMode(VIEWING)} />;
	} else {
		children = [
			<EditButton
				key="edit"
				pressed={mode === EDITING}
				onClick={() => setMode(mode === EDITING ? VIEWING : EDITING)}
			/>,
			<DeleteButton
				key="delete"
				pressed={mode === DELETING}
				onClick={() => setMode(mode === DELETING ? VIEWING : DELETING)}
			/>,
		];
	}

	return (
		<div className="map-controls">{children}</div>
	);
};

MapControls.propTypes = {
	mode: PropTypes.oneOf([VIEWING, DRAWING, EDITING, DELETING]).isRequired,
	setMode: PropTypes.func.isRequired,
	hasField: PropTypes.bool.isRequired,
};

/**
 * Creates map controls for a corresponding Google Map.
 * The controls are buttons styled by CSS, and the buttons that appear
 * are dependent on the state of the map and the MapControlsProps.
 * When a field exists on the screen, a button for editing the polygon shape
 * and a button for deleting the polygon are shown. Otherwise, a button
 * for drawing a fresh polygon is shown. Once the draw button is clicked,
 * it switched to a select button to switch out of drawing mode.
 */
export default function createControls(map: google.maps.Map) {
	const element = document.createElement('div');
	map.controls[ControlPosition.LEFT_TOP].push(element);

	return function renderControls(props: MapControlsProps) {
		let hasField = false;
		map.data.forEach(() => { hasField = true; });
		render(<MapControls hasField={hasField} {...props} />, element);
	};
}
