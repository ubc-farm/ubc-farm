import { createElement, Children, PropTypes } from 'react';
import TableBase from '../present/Table.jsx';
import Head from '../present/Head.jsx';
import Body from './Body.jsx';
/** @jsx createElement */

function getKeyField(columns, keyFieldProp) {
	if (keyFieldProp) return keyFieldProp;
	for (const { isKey, field } of columns) {
		if (isKey) return field;
	}

	throw new TypeError('No keyField detected');
}

const Table = (props) => {
	const columns = Children.map(props.children, col => col.props);
	let keyField;
	if (Array.isArray(props.tableData) || props.tableData instanceof Set) {
		keyField = getKeyField(columns, props.keyField);
	}

	return (
		<TableBase className={props.tableClassName}>
			<Head
				headClassName={props.headClassName}
				headRowClassName={props.headRowClassName}
			>
				{ props.children }
			</Head>
			<Body
				keyField={keyField}
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
	tableData: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.object),
		PropTypes.instanceOf(Set),
		PropTypes.instanceOf(Map),
		PropTypes.object,
	]).isRequired,
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
