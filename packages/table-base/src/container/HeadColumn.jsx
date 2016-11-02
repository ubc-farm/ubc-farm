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
	dataSort: PropTypes.bool,
	dataFormat: PropTypes.func, // (cell, row) => ReactNode
	filterFormatted: PropTypes.bool,
	filterValue: PropTypes.func, // (cell, row) => any
	csvFormat: PropTypes.func, // (cell, row) => string
	csvHeader: PropTypes.string,
	hidden: PropTypes.bool,
	export: PropTypes.bool,
	hiddenInInsert: PropTypes.bool,
	searchable: PropTypes.bool,
	columnTitle: PropTypes.bool,
	sortFunc: PropTypes.func, // (a, b, order. sortField) => number
	// (cell, row, rowIndex, columnIndex) => string
	headerClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	// (cell, row, rowIndex, columnIndex) => string
	columnClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	editable: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({
		type: PropTypes.string,
		validator: PropTypes.func, // (cellValue) => boolean
		options: PropTypes.arrayOf(PropTypes.string),
	})]),
	customEditor: PropTypes.element,
	autoKey: PropTypes.bool,
	filter: PropTypes.shape({
		type: PropTypes.oneOf([
			'TextFilter',
			'SelectFilter',
			'NumberFilter',
			'DataFilter',
			'RegexFilter',
		]).isRequired,
		defaultValue: PropTypes.any.isRequired,
		delay: PropTypes.number,
		placeholder: PropTypes.string,
		numberComparators: PropTypes.arrayOf(PropTypes.string),
		options: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.number)]),
	}),
	onHeaderClick: PropTypes.func,
};

HeadColumn.defaultProps = {
	searchable: true,
};

export default HeadColumn;
