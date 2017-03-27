import { createElement as h, PropTypes } from 'react'; /** @jsx h */
import { classlist } from 'ubc-farm-utils';

const ToggleButton = ({ checked, onChange, children, id, className }) => (
	<span className="toggle-button-container">
		<input
			type="checkbox" hidden
			className="toggle-button-checkbox"
			onChange={onChange} id={id}
		/>

		<label
			role="button"
			htmlFor={id}
			aria-pressed={String(checked)}
			className={classlist('button', className)}
		>
			{children}
		</label>
	</span>
);

ToggleButton.propTypes = {
	checked: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
	children: PropTypes.node,
	id: PropTypes.string.isRequired,
	className: PropTypes.string,
};

ToggleButton.defaultProps = {
	checked: false,
};

export default ToggleButton;
