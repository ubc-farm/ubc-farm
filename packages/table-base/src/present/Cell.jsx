import { createElement, PropTypes } from 'react';
import { classList as cx } from '@ubc-farm/utils';
/** @jsx createElement */

/**
 * Presentational component for a table cell. If no children are set,
 * the cell will try to use the noDataText prop.
 */
const Cell = props => (
	<td	{...props} className={cx('farmtable-Cell', props.className)}>
		{ props.children || props.noDataText || null }
	</td>
);

Cell.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
	noDataText: PropTypes.node,
};

export default Cell;
