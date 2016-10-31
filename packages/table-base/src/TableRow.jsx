import { createElement } from 'react'; /** @jsx createElement */
import { connect } from 'react-redux';
import { classList as cx } from '@ubc-farm/utils';

import SelectCell from './checks/SelectCell.jsx';
import TableCell from './TableCell.jsx';

export default function TableRow(props) {
	const { rowData, rowIndex, isSelected, columnData } = props;
	const { keyField, trClassName, selectRow } = props;

	const rowClass = typeof trClassName === 'function'
		? trClassName(rowData, rowIndex)
		: trClassName;

	let selectedClass;
	let check;
	let onSelect;
	if (selectRow) {
		const { className, mode } = selectRow;
		if (isSelected) {
			selectedClass = cx('ubcfarm-TableRow--selected', className);
		}

		onSelect = e => selectRow.onSelect(rowData, isSelected, e);

		check = (
			<SelectCell
				mode={mode}
				checked={isSelected}
				onSelect={onSelect}
				selectRow={selectRow}
			/>
		);
	}

	return (
		<tr
			className={cx('ubcfarm-TableRow', rowClass, selectedClass)}
			onClick={selectRow && selectRow.clickToSelect && onSelect}
		>
			{ check }
			{columnData.map(({ dataField, editable }) => {
				const cellData = rowData[dataField];
				return (
					<TableCell
						key={dataField}
						cellData={cellData} editable={editable}
						noDataText={props.noDataText}
					/>
				);
			})}
		</tr>
	);
}

