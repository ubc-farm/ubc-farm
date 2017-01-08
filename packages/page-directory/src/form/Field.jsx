import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import { classlist } from '@ubc-farm/utils';

const Field = ({ label, children, className }) => (
	<label className="dir-field">
		<span className={classlist('dir-field-label', className)}>
			{label}
		</span>
		{children}
	</label>
);

Field.propTypes = {
	children: PropTypes.node,
	label: PropTypes.node,
	className: PropTypes.string,
}

export default Field;
