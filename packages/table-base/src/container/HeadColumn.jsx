import { createElement, PropTypes } from 'react';
import HeadColumnBase from '../present/HeadColumn.jsx';
/** @jsx createElement */

export const HeadColumn = props => (
	<HeadColumnBase
		hidden={props.hidden}
		onClick={props.onHeaderClick}
		className={props.headerClassName}
	>
		{ props.children }
	</HeadColumnBase>
);

HeadColumn.propTypes = {
	dataField: PropTypes.string.isRequired,
	children: PropTypes.node,
	isKey: PropTypes.bool,

	format: PropTypes.func, // (cell, row) => ReactNode
	hidden: PropTypes.bool,

	// (cell, row, rowIndex) => string
	columnClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	headerClassName: PropTypes.string,

	onHeaderClick: PropTypes.func,
	onCellClick: PropTypes.func, // (cell, row, rowIndex) => void
};

HeadColumn.defaultProps = {
	format: cell => cell,
	hidden: false,
};

export default HeadColumn;
