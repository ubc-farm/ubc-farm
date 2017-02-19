import { createElement, PropTypes, SFC } from 'react'; /** @jsx createElement */
import { InputProps } from './IProps';

const TaskNameInput: SFC<InputProps> = ({ bindInput, disabled }) => (
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
	disabled: false,
};

export default TaskNameInput;
