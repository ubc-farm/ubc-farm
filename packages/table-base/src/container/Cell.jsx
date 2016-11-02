import { createElement, PropTypes, Component } from 'react';
import { bindAll } from 'lodash-es';
import CellBase from '../present/Cell.jsx';
/** @jsx createElement */

export default class Cell extends Component {
	constructor(props) {
		super(props);

		bindAll(this, 'handleBlur', 'handleClick', 'handleKey');
		this.state = { editing: false, value: props.children };
	}

	handleBlur() {
		this.setState({ editing: false });
		const { cellEdit, rowData, columnName } = this.props;
		cellEdit.beforeCellSave(rowData, columnName, this.state.value);
	}
	handleKey(e) {
		if (e.keyCode === 13 && !this.props.cellEdit.blurToSave) {
			const { cellEdit, rowData, columnName } = this.props;
			cellEdit.beforeCellSave(rowData, columnName, this.state.value);
		}
	}

	handleClick(e) {
		if (!this.props.clickToSelectAndEditCell) e.stopPropagation();
		if (this.props.editable) this.setState({ editing: true });
	}

	renderInput() {
		if (!this.state.editing) return null;
		return null; // TODO;
	}

	render() {
		const clickListener = {};
		if (this.props.editable) {
			switch (this.props.cellEdit.mode) {
				case 'click':
					clickListener.onClick = this.handleClick;
					break;
				case 'dblclick':
					clickListener.onDoubleClick = this.handleClick;
					break;
				default:
					throw new Error(`${this.props.cellEdit.mode} != click or dblclick`);
			}
		}

		return (
			<CellBase
				{...clickListener}
				className={this.state.editing ? 'farmtable-Cell--editing' : null}
			>
				{ this.state.editing ? this.renderInput() : this.props.children }
			</CellBase>
		);
	}
}

Cell.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	hidden: PropTypes.bool,
	rowData: PropTypes.object,
	rowId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	columnName: PropTypes.string,

	column: PropTypes.shape({

	}),

	editable: PropTypes.bool,
	clickToSelectAndEditCell: PropTypes.bool,
	cellEdit: PropTypes.shape({
		mode: PropTypes.oneOf(['click', 'dbclick']).isRequired,
		blurToSave: PropTypes.bool,
		beforeCellSave: PropTypes.func, // (row, cellName, cellValue) => boolean
	}),
};
