import {createElement as h, PropTypes} from 'react'; /** @jsx h */
import Cell from '../bits/cell.js';
import Column from '../bits/column.js';
import HeaderCell from './head-cells.js'
import Checkbox from './checkbox.js';

const Head = props => {
	const {columns, sorting, selectedLength} = props;
	const {onCheckboxChange, onColumnClick} = props;

	const sortKey = sorting && sorting.column;
	const descending = sorting && sorting.descending;
	const allSelected = selectedLength === props.dataLength;

	return (
		<thead>
			<tr className='table-th-row'>
				{selectedLength !== undefined ? 
					<Cell header align='center'>
						<Checkbox
							checked={allSelected}
							indeterminate={selectedLength > 0 && !allSelected}
							onChange={onCheckboxChange}
							readOnly={onCheckboxChange ? false : true}
						/>
					</Cell>
				: null}
				{columns.map(column => (
					<HeaderCell key={column.key} {...column.toJSON()} 
						onClick={() => onColumnClick(column)}
						active={column.useSorting && sortKey == column}
						descending={column.useSorting ? descending : undefined}
					>{column.title}</HeaderCell>
				))}
			</tr>
		</thead>
	);
}

Head.propTypes = {
	columns: PropTypes.arrayOf(PropTypes.instanceOf(Column)).isRequired,
	selectedLength: PropTypes.number,
	dataLength: props => {
		if (props.selectedLength !== undefined 
		&& typeof props.dataLength !== 'number'
		&& props.dataLength > -1) {
			return new Error('selectedLength prop is set, ' + 
				'but dataLength is missing or not a valid number');
		}
	},
	onColumnClick: PropTypes.func,
	onCheckboxChange: PropTypes.func,
	sorting: PropTypes.shape({
		columnKey: PropTypes.string,
		column: PropTypes.instanceOf(Column),
		descending: PropTypes.bool
	})
}

export default Head;