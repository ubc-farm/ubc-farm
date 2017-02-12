import { createElement, PropTypes } from 'react'; /** @jsx createElement */

const TaskNameInput = ({ bindInput, disabled }) => (
	<label className="editor-input-wrapper">
		<span className="editor-label">Name</span>
		<input
			type="text" className="editor-input"
			disabled={disabled}
			{...bindInput('name')}
		/>
	</label>
);

TaskNameInput.propTypes = {
	bindInput: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
};

TaskNameInput.defaultProps = {
	value: '',
	disabled: false,
};

export default TaskNameInput;
