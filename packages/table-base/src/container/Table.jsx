import { createElement, Children, PropTypes } from 'react';
import TableBase from '../present/Table.jsx';
import Head from '../present/Head.jsx';
import Body from './Body.jsx';
/** @jsx createElement */

function getKeyField(columns, keyFieldProp) {
	if (keyFieldProp) return keyFieldProp;
	for (const { isKey, dataField } of columns) {
		if (isKey) return dataField;
	}

	throw new TypeError('No keyField detected');
}

const Table = (props) => {
	const columns = Children.map(props.children, col => col.props);

	return (
		<TableBase className={props.tableClassName}>
			<Head
				headClassName={props.headClassName}
				headRowClassName={props.headRowClassName}
			>
				{ props.children }
			</Head>
			<Body
				keyField={getKeyField(columns, props.keyField)}
				tableData={props.tableData}
				columns={columns}
				rowClassName={props.rowClassName}
				bodyClassName={props.bodyClassName}
				onRowClick={props.onRowClick}
				onRowMouseEnter={props.onRowMouseEnter}
				onRowMouseLeave={props.onRowMouseLeave}
			/>
		</TableBase>
	);
};

Table.propTypes = {
	children: PropTypes.node.isRequired,
	tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
	keyField: PropTypes.string,

	// (row, rowIndex) => string
	rowClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	tableClassName: PropTypes.string,
	headClassName: PropTypes.string,
	bodyClassName: PropTypes.string,
	headRowClassName: PropTypes.string,

	onRowClick: PropTypes.func, // (row) => void
	onRowMouseEnter: PropTypes.func,
	onRowMouseLeave: PropTypes.func,
	onMouseEnter: PropTypes.func,
	onMouseLeave: PropTypes.func,
};

export default Table;
