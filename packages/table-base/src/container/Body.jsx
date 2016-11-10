import { createElement, PropTypes } from 'react';
import BodyBase from '../present/Body.jsx';
import Row from './Row.jsx';
/** @jsx createElement */

/** Presentational component for a tbody */
const Body = (props) => {
	let rows;
	const table = props.tableData;

	if (Array.isArray(table) || table instanceof Set) {
		rows = Array.from(table).map((rowData, rowIndex) => (
			<Row
				key={rowData[props.keyField]}
				rowData={rowData}
				columns={props.columns}
				rowIndex={rowIndex}
				rowClassName={props.rowClassName}
				onRowClick={props.onRowClick}
				onRowMouseEnter={props.onRowMouseEnter}
				onRowMouseLeave={props.onRowMouseLeave}
			/>
		));
	} else if (table instanceof Map) {
		rows = Array.from(table).map(([key, rowData], rowIndex) => (
			<Row
				key={key}
				rowData={rowData}
				columns={props.columns}
				rowIndex={rowIndex}
				rowClassName={props.rowClassName}
				onRowClick={props.onRowClick}
				onRowMouseEnter={props.onRowMouseEnter}
				onRowMouseLeave={props.onRowMouseLeave}
			/>
		));
	} else {
		rows = Object.keys(table).map((key, rowIndex) => (
			<Row
				key={key}
				rowData={table[key]}
				columns={props.columns}
				rowIndex={rowIndex}
				rowClassName={props.rowClassName}
				onRowClick={props.onRowClick}
				onRowMouseEnter={props.onRowMouseEnter}
				onRowMouseLeave={props.onRowMouseLeave}
			/>
		));
	}

	return <BodyBase className={props.bodyClassName}>{ rows }</BodyBase>;
};

Body.propTypes = {
	tableData: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.object),
		PropTypes.instanceOf(Set),
		PropTypes.instanceOf(Map),
		PropTypes.object,
	]).isRequired,
	columns: PropTypes.arrayOf(PropTypes.object).isRequired,
	keyField: PropTypes.string,

	// (row, rowIndex) => string
	rowClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	bodyClassName: PropTypes.string,

	onRowClick: PropTypes.func, // (row) => void
	onRowMouseEnter: PropTypes.func,
	onRowMouseLeave: PropTypes.func,
};

export default Body;
