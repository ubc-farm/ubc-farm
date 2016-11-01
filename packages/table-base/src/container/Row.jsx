import { createElement, PropTypes, Component } from 'react';
import { map } from 'lodash-es';
import RowBase, { RowSelect } from '../present/Row.jsx';
import Cell from '../present/Cell.jsx';
/** @jsx createElement */

export default class Row extends Component {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
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
				className={className && (typeof className === 'function'
					?	className(rowData, props.index)
					: className)}
			>
				{ (selectEnabled && !props.hideSelectColumn) ?
					<RowSelect
						type={props.mode}
						checked={selected}
						onChange={handleChange}
						disabled={unselectable}
					/>
					: null }
				{ map(...props.columnInfo, ([key, column]) => (
					<Cell
						key={key}
						hidden={column.hidden}
						className={column.className}
						rowData={rowData}
						cellEdit={props.cellEdit}
						rowId={props.id}
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
	id: PropTypes.string,
	columnInfo: PropTypes.instanceOf(Map).isRequired,
	rowData: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
	noDataText: PropTypes.node,
	className: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

	cellEdit: PropTypes.object,
	selectEnabled: PropTypes.bool,
	mode: PropTypes.oneOf(['radio', 'checkbox']).isRequired,
	clickToSelect: PropTypes.bool,
	selectedClassName: PropTypes.string,
	selected: PropTypes.bool,
	unselectable: PropTypes.bool,
	hideSelectColumn: PropTypes.bool,
	showOnlySelected: PropTypes.bool,
	onSelect: PropTypes.func,
};
