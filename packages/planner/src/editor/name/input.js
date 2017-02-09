import { createElement as h, PropTypes } from 'react'; /** @jsx h */

const TaskNameInput = ({ value = '', disabled, onChange, placeholder }) => (
	<input
		type="text"
		value={value}
		disabled={disabled}
		onChange={onChange}
		placeholder={placeholder}
	/>
);

TaskNameInput.propTypes = {
	value: PropTypes.string,
	placeholder: PropTypes.string,
	disabled: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
};

export default TaskNameInput;
