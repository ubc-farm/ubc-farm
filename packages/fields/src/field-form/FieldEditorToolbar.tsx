import { createElement, PropTypes, StatelessComponent, MouseEventHandler } from 'react';
/** @jsx createElement */

interface FieldEditorToolbarProps {
	onSubmit: () => void;
	onCancel: MouseEventHandler;
	canSubmit?: boolean;
}

const FieldEditorToolbar: StatelessComponent = (
	{ onSubmit, onCancel, canSubmit }: FieldEditorToolbarProps
) => (
	<div>
		<button onClick={onCancel}>Cancel</button>
		<button onClick={onSubmit} disabled={!canSubmit}>Save</button>
	</div>
);

FieldEditorToolbar.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
	canSubmit: PropTypes.bool,
};

FieldEditorToolbar.defaultProps = {
	canSubmit: true,
};

export default FieldEditorToolbar;
