import { createElement as h, PropTypes } from 'react'; /** @jsx h */
import { classlist as cx } from 'ubc-farm-utils/index.js';
import Cell from '../bits/cell.js';

/**
 * @param {Object} props
 * @param {boolean} [props.showCheckbox] - if true, display a checkbox
 * @param {boolean} [props.checked] - wheter or not the checkbox is checked
 * @param {function} [props.onChange] - callback for the checkbox change
 * @param {string} [props.rowKey] - passed to the onChange callback
 * @param {ReactElement} [props.children]
 */
const Row = props => {
	const { checked, showCheckbox, className, children } = props;

	let onChange;
	if (props.onChange) onChange = () => props.onChange(props.rowKey);

	return (
		<tr className={cx(className, { checked })} onClick={onChange}>
			{showCheckbox ?
				<Cell align="center">
					<input type="checkbox" {...{ checked, onChange }} />
				</Cell>
			: null}
			{children}
		</tr>
	);
};

Row.propTypes = {
	onChange: PropTypes.func,
	rowKey: PropTypes.string,
	showCheckbox: PropTypes.bool,
	checked: PropTypes.bool,
	className: PropTypes.string,
	children: PropTypes.node,
};

export default Row;
