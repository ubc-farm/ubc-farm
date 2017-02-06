import { createElement, PropTypes } from 'react'; /** @jsx createElement */

const FieldEditorToolbar = ({ onSubmit, onCancel, canSubmit }) => (
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
