import { createElement, PropTypes, Component } from 'react';
import { map } from 'lodash-es';
import RowBase, { RowSelect } from '../present/Row.jsx';
import Cell from './Cell.jsx';
/** @jsx createElement */

/**
 * Creates row with cell layout order matching that of the given columns
 */
export default class Row extends Component {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.onMouseEnter = props.onRowMouseEnter
			? () => props.onRowMouseEnter(props.rowData)
			: undefined;
		this.onMouseLeave = props.onRowMouseOut
			? () => props.onRowMouseOut(props.rowData)
			: undefined;
	}

	handleChange(event) {
		const { onSelect, rowData, selected } = this.props;
		return onSelect(rowData, selected, event);
	}

	render() {
		const { props, handleChange } = this;
		const { rowData, selectEnabled, selected, unselectable, className } = props;

		if (selectEnabled && props.showOnlySelected && !selected) return false;

		return (
			<RowBase
				onClick={props.clickToSelect ? handleChange : null}
				selected={selectEnabled && selected}
				unselectable={selectEnabled && unselectable}
				className={typeof className === 'function'
					? className(rowData, props.index)
					: className}
				selectedClassName={props.selectedClassName}
				onMouseEnter={this.onMouseEnter}
				onMouseLeave={this.onMouseLeave}
			>
				{ (selectEnabled && !props.hideSelectColumn) ?
					<RowSelect
						type={props.mode}
						checked={selected}
						onChange={handleChange}
						disabled={unselectable}
					/>
					: null }
				{ map([...props.columnInfo], ([key, column]) => (
					<Cell
						key={key} columnName={key}
						column={column} rowData={rowData}
						rowId={props.id}
						className={column.className}
						hidden={column.hidden}
						editable={column.editable}
						cellEdit={props.cellEdit}
						clickToSelectAndEditCell={selectEnabled && props.clickToSelectAndEditCell}
					>
						{
							column.format(rowData[key], rowData, props.index)
							|| props.noDataText
						}
					</Cell>
				)) }
			</RowBase>
		);
	}
}

Row.propTypes = {
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	columnInfo: PropTypes.instanceOf(Map).isRequired,
	rowData: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
	noDataText: PropTypes.node,
	className: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

	onRowMouseEnter: PropTypes.func,
	onRowMouseOut: PropTypes.func,

	cellEdit: PropTypes.object,
	selectEnabled: PropTypes.bool,
	mode: PropTypes.oneOf(['radio', 'checkbox']),
	clickToSelect: PropTypes.bool,
	clickToSelectAndEditCell: PropTypes.bool,
	selectedClassName: PropTypes.string,
	selected: PropTypes.bool,
	unselectable: PropTypes.bool,
	hideSelectColumn: PropTypes.bool,
	showOnlySelected: PropTypes.bool,
	onSelect: PropTypes.func,
};
