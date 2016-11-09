import { createElement, PropTypes } from 'react';
import RowBase from '../present/Row.jsx';
import Cell from '../present/Cell.jsx';
/** @jsx createElement */

function simpleBind(func, ...args) {
	if (!func) return null;
	return (...eventArgs) => func(...args, ...eventArgs);
}

/**
 * Creates row with cell layout order matching that of the given columns
 */
const Row = (props) => {
	console.log(props);
	const { rowData: row, rowIndex: index } = props;

	return (
		<RowBase
			className={typeof props.rowClassName === 'function'
				?	props.rowClassName(row, props.rowIndex)
				: props.rowClassName}
			onClick={simpleBind(row, props.onRowClick)}
			onMouseEnter={simpleBind(row, props.onRowMouseEnter)}
			onMouseLeave={simpleBind(row, props.onRowMouseLeave)}
		>
			{props.columns.map((column, colIndex) => {
				const cell = row[column.dataField];

				return (
					<Cell
						key={column.dataField}
						hidden={column.hidden}
						className={typeof column.className === 'function'
							?	column.className(cell, row, index, colIndex)
							: column.className}
						onClick={simpleBind(column.onCellClick, cell, row, index, colIndex)}
					>
						{ column.format(cell, row) }
					</Cell>
				);
			})}
		</RowBase>
	);
};

Row.propTypes = {
	rowData: PropTypes.object.isRequired,
	columns: PropTypes.arrayOf(PropTypes.shape({
		dataField: PropTypes.string.isRequired,
		format: PropTypes.func, // (cell, row) => ReactNode
		hidden: PropTypes.bool,
		// (cell, row, rowIndex) => string
		columnClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
		onCellClick: PropTypes.func, // (cell, row, rowIndex) => void
	})).isRequired,
	rowIndex: PropTypes.number.isRequired,

	// (row, rowIndex) => string
	rowClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

	onRowClick: PropTypes.func, // (row) => void
	onRowMouseEnter: PropTypes.func, // (row) => void
	onRowMouseLeave: PropTypes.func, // (row) => void
};

export default Row;
