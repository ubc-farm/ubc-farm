import { createElement, PropTypes } from 'react';
import { omit } from 'lodash-es';
import { classlist as cx } from '@ubc-farm/utils';
import Cell from './Cell.jsx';
/** @jsx createElement */

/**
 * Presentational component for a table row
 * @param {boolean} [props.selected] - mark the row as `selected`, which
 * adds an extra class that could be styled with CSS.
 */
const Row = props => (
	<tr
		{...omit(props, 'selected', 'unselectable', 'selectedClassName')}
		className={cx('farmtable-Row', props.className, {
			'farmtable-Row--unselectable': props.unselectable,
			'farmtable-Row--selected': props.selected,
			[props.selectedClassName]: props.selected,
		})}
	/>
);
Row.propTypes = {
	className: PropTypes.string,
	selected: PropTypes.bool,
	unselectable: PropTypes.bool,
	selectedClassName: PropTypes.string,
};
export default Row;

export const RowSelect = props => (
	<Cell className="farmtable-Row-select">
		<input {...props} />
	</Cell>
);
