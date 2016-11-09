import { createElement, PropTypes } from 'react';
import { classlist as cx } from '@ubc-farm/utils';
import Head from '../container/Head.jsx';
import Body from './Body.jsx';
/** @jsx createElement */

/**
 * Presentational component for the main table. Mainly it distributes the props
 * among the child thead and tbody components
 */
const Table = props => (
	<div className={cx('farmtable-Table-container', props.containerClassName)}>
		{ props.toolbar }
		<table
			className={cx('farmtable-Table', props.className)}
			onMouseEnter={props.onMouseEnter}
			onMouseLeave={props.onMouseLeave}
		>
			{ props.children }
		</table>
		{ props.footer }
		{ props.pagination }
	</div>
);

Table.propTypes = {
	children: PropTypes.node,
	toolbar: PropTypes.node,
	footer: PropTypes.node,
	pagination: PropTypes.node,
	className: PropTypes.string,
	containerClassName: PropTypes.string,
	onMouseEnter: PropTypes.func,
	onMouseLeave: PropTypes.func,
};

export default Table;
