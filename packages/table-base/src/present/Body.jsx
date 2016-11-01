import { createElement, PropTypes } from 'react';
import { map } from 'lodash-es';
import { classList as cx } from '@ubc-farm/utils';
import Row from '../container/Row.jsx';
/** @jsx createElement */

/** Presentational component for a tbody */
const Body = (props) => {
	const { selectRow, keyField } = props;
	return (
		<tbody className={cx('farmtable-Body', props.bodyClassName)}>
			{ map(...props.tableData, (rowData, index) => {
				const id = rowData[keyField];
				return (
					<Row
						{...props.selectRow}
						key={id} id={id} index={index}
						columnInfo={props.columnInfo}
						selectEnabled={selectRow}
						selectedClassName={selectRow && selectRow.className}
						selected={selectRow && selectRow.selected.has(id)}
						unselectable={selectRow && selectRow.unselectable.has(id)}
						className={props.trClassName}
						cellEdit={props.cellEdit}
						noDataText={props.noDataText}
					/>
				);
			}) }
		</tbody>
	);
};

Body.propTypes = {
	columnInfo: PropTypes.instanceOf(Map).isRequired,
	tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
	keyField: PropTypes.string.isRequired,

	noDataText: PropTypes.node,
	trClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	bodyClassName: PropTypes.string,

	selectRow: PropTypes.shape({
		mode: PropTypes.oneOf(['radio', 'checkbox']).isRequired,
		clickToSelect: PropTypes.bool,
		// clickToSelectAndEditCell: PropTypes.bool,
		className: PropTypes.string,
		selected: PropTypes.instanceOf(Set),
		unselectable: PropTypes.instanceOf(Set),
		hideSelectColumn: PropTypes.bool,
		showOnlySelected: PropTypes.bool,
		onSelect: PropTypes.func, // (row, isSelected, event) => boolean
	}),

	cellEdit: PropTypes.object,
};

export default Body;
