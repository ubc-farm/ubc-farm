import { createElement, PropTypes } from 'react';
import BodyBase from '../present/Body.jsx';
import Row from './Row.jsx';
/** @jsx createElement */

/** Presentational component for a tbody */
const Body = props => (
	<BodyBase className={props.bodyClassName}>
		{props.tableData.map((rowData, rowIndex) => (
			<Row
				key={rowData[props.keyField]}
				help={console.log(rowData, props)}
				rowData={rowData}
				columns={props.columns}
				rowIndex={rowIndex}
				rowClassName={props.rowClassName}
				onRowClick={props.onRowClick}
				onRowMouseEnter={props.onRowMouseEnter}
				onRowMouseLeave={props.onRowMouseLeave}
			/>
		))}
	</BodyBase>
);

Body.propTypes = {
	tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
	columns: PropTypes.arrayOf(PropTypes.object).isRequired,
	keyField: PropTypes.string.isRequired,

	// (row, rowIndex) => string
	rowClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	bodyClassName: PropTypes.string,

	onRowClick: PropTypes.func, // (row) => void
	onRowMouseEnter: PropTypes.func,
	onRowMouseLeave: PropTypes.func,
};

export default Body;
