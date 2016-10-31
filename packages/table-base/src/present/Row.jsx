import { createElement, PropTypes } from 'react';
import { classList as cx } from '@ubc-farm/utils';
import Cell from './Cell.jsx';
/** @jsx createElement */

/**
 * Presentational component for a table row
 * @param {boolean} [props.selected] - mark the row as `selected`, which
 * adds an extra class that could be styled with CSS.
 */
const Row = props => (
	<td
		{...props}
		className={cx(
			'farmtable-Row',
			{ 'farmtable-Row--selected': props.selected },
			props.className,
		)}
	/>
);
Row.propTypes = {
	className: PropTypes.string,
	selected: PropTypes.bool,
};
export default Row;

export const RowSelect = props => (
	<Cell className="farmtable-Row-select">
		<input {...props} />
	</Cell>
);
