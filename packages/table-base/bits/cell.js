import {createElement, PropTypes} from 'react'; 
import {classlist as cx} from 'ubc-farm-utils/index.js'

/**
 * Represents a cell in a table. If the header prop is set to true,
 * then a table header cell will be used instead of a normal table cell.
 */
const Cell = ({
	children, header, onClick, align = 'left', 
	colSpan, headers, rowSpan, scope, className, id, style
}) => createElement(
	header ? 'th' : 'td',
	{
		className: cx(className, `align-${align}`),
		onClick, colSpan, rowSpan, id, style,
		scope: header ? scope : undefined,
		headers: Array.isArray(headers)? headers.join(' ') : headers
	},
	children
);

Cell.propTypes = {
	children: PropTypes.node,
	align: PropTypes.oneOf(['left', 'center', 'right']),
	header: PropTypes.bool,
	onClick: PropTypes.func,
	colSpan: PropTypes.number,
	rowSpan: PropTypes.number,
	scope: PropTypes.oneOf(['row', 'col', 'rowgroup', 'colgroup', 'auto']),
	headers: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.string),
		PropTypes.string
	]),
	className: PropTypes.string,
	id: PropTypes.string,
	style: PropTypes.object
}

export default Cell;