import { createElement, PropTypes, SFC } from 'react'; /** @jsx createElement */
import { InputProps } from './IProps';

const TaskTimeInput: SFC<InputProps> = ({ bindInput, disabled }) => (
	<div className="editor-input-wrapper">
		<span className="editor-label">Time</span>
		<input
			type="datetime-local" className="editor-input"
			disabled={disabled}
			{...bindInput('start')}
		/>
		-
		<input
			type="datetime-local" className="editor-input"
			disabled={disabled}
			{...bindInput('end')}
		/>
	</div>
);

TaskTimeInput.propTypes = {
	bindInput: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
};

TaskTimeInput.defaultProps = {
	disabled: false,
};

export default TaskTimeInput;
