import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import { render } from 'react-dom';
import { VIEWING, DRAWING, EDITING, DELETING } from './setMode.js';

const { ControlPosition } = window.google.maps;

const PanButton = ({ onClick }) => (
	<button onClick={onClick} className="map-button map-button-pan" title="Pan" />
);
const DrawButton = ({ onClick }) => (
	<button onClick={onClick} className="map-button map-button-draw" title="Draw" />
);
const EditButton = ({ onClick, pressed }) => (
	<button
		onClick={onClick} title="Edit"
		className="map-button map-button-edit"
		aria-pressed={pressed ? 'true' : 'false'}
	/>
);
const DeleteButton = ({ onClick, pressed }) => (
	<button
		onClick={onClick} title="Delete"
		className="map-button map-button-delete"
		aria-pressed={pressed ? 'true' : 'false'}
	/>
);

PanButton.propTypes = { onClick: PropTypes.func };
DrawButton.propTypes = { onClick: PropTypes.func };
EditButton.propTypes = { onClick: PropTypes.func, pressed: PropTypes.bool };
DeleteButton.propTypes = { onClick: PropTypes.func, pressed: PropTypes.bool };


export const MapControls = ({ mode, setMode, hasField }) => {
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


export default function createControls(map) {
	const element = document.createElement('div');
	map.controls[ControlPosition.LEFT_TOP].push(element);

	return function renderControls(props) {
		let hasField = false;
		map.data.forEach(() => { hasField = true; });
		render(<MapControls hasField={hasField} {...props} />, element);
	};
}
