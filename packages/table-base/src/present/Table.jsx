import { createElement, PropTypes } from 'react';
import { classlist as cx } from '@ubc-farm/utils';
/** @jsx createElement */

/**
 * Presentational component for the main table. Mainly it distributes the props
 * among the child thead and tbody components
 */
const Table = props => (
	<table
		{...props}
		className={cx('farmtable-Table', props.className)}
	/>
);

Table.propTypes = {
	className: PropTypes.string,
};

export default Table;
