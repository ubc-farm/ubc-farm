import { createElement, PropTypes } from 'react';
import { classList as cx } from '@ubc-farm/utils';
import Head from '../container/Head.jsx';
import Body from './Body.jsx';
/** @jsx createElement */

/**
 * Presentational component for the main table. Mainly it distributes the props
 * among the child thead and tbody components
 */
const Table = props => (
	<form className={cx('farmtable-Table-container', props.containerClassName)}>
		{ props.toolbar }
		<table
			className={cx('farmtable-Table', props.className)}
			onMouseEnter={props.onMouseEnter}
			onMouseLeave={props.onMouseLeave}
		>
			<Head
				headClassName={props.headClassName}
				headRowClassName={props.headRowClassName}
				sortName={props.sortName}
				sortOrder={props.sortOrder}
				onSortChange={props.onSortChange}
				isAllSelected={props.isAllSelected}
				indeterminate={props.selectRow && props.selectRow.selected.size > 0}
				columnInfo={props.columnInfo}
			/>
			<Body
				keyField={props.keyField}
				noDataText={props.noDataText}
				trClassName={props.trClassName}
				bodyClassName={props.bodyClassName}
				selectRow={props.selectRow}
				cellEdit={props.cellEdit}
				tableData={props.tableData}
				columnInfo={props.columnInfo}
				onRowMouseEnter={props.onRowMouseEnter}
				onRowMouseOut={props.onRowMouseOut}
			/>
		</table>
		{ props.footer }
		{ props.pagination }
	</form>
);

Table.propTypes = {
	tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
	columnInfo: PropTypes.instanceOf(Map).isRequired,
	keyField: PropTypes.string.isRequired,
	toolbar: PropTypes.node,
	footer: PropTypes.node,
	pagination: PropTypes.node,

	className: PropTypes.string,
	containerClassName: PropTypes.string,
	trClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	bodyClassName: PropTypes.string,
	headClassName: PropTypes.string,
	headRowClassName: PropTypes.string,
	noDataText: PropTypes.node,

	onMouseEnter: PropTypes.func,
	onMouseLeave: PropTypes.func,
	onRowMouseEnter: PropTypes.func,
	onRowMouseOut: PropTypes.func,

	sortName: PropTypes.string,
	sortOrder: PropTypes.oneOf(['desc', 'asc']),
	onSortChange: PropTypes.func,

	isAllSelected: PropTypes.bool,
	selectRow: PropTypes.shape({
		mode: PropTypes.oneOf(['radio', 'checkbox']).isRequired,
		clickToSelect: PropTypes.bool,
		className: PropTypes.string,
		selected: PropTypes.instanceOf(Set),
		unselectable: PropTypes.instanceOf(Set),
		hideSelectColumn: PropTypes.bool,
		showOnlySelected: PropTypes.bool,
		onSelect: PropTypes.func,
		onSelectAll: PropTypes.func,
	}),
	cellEdit: PropTypes.shape({
		mode: PropTypes.oneOf(['click', 'dbclick']).isRequired,
		blurToSave: PropTypes.bool,
		beforeCellSave: PropTypes.func, // (row, cellName, cellValue) => boolean
	}),
};

export default Table;
