import { createElement, PureComponent, PropTypes } from 'react';
import { bindAll } from 'lodash-es';
import { classList as cx } from '@ubc-farm/utils';
/** @jsx createElement */

export default class TableCell extends PureComponent {
	constructor(props) {
		super(props);

		bindAll(this, 'handleClick', 'handleSave', 'handleKeyPress', 'handleChange');

		this.state = {
			editing: false,
			value: props.formattedData,
		};
	}

	componentWillReceiveProps({ formattedData }) {
		if (formattedData !== this.state.value) {
			this.setState({ value: formattedData });
		}
	}

	handleClick(e) {
		if (!this.props.clickToSelectAndEditCell) e.stopPropagation();
		if (this.props.editable) {
			this.setState({ editing: !this.state.editing });
		}
	}

	handleSave(e, newValue = e.target.value) {
		const validator = this.props.editable.validator;
		if (validator) {
			if (!validator(newValue)) return;
		}
		this.props.onSave(newValue, e);
	}

	handleKeyPress(e) {
		if (e.keyCode === 13) {
			this.handleSave(e, this.props.formattedData);
		}
	}

	handleChange(e) {
		this.setState({ value: e.target.value });
	}

	render() {
		const editable = Boolean(this.props.editable && this.props.cellEdit);
		const editMode = this.props.cellEdit.mode;
		const blurToSave = this.props.cellEdit.blurToSave;

		let child;
		if (this.state.editing) {
			const inputProps = {
				className: 'ubcfarm-TableCell-input',
				onChange: this.handleChange,
				onKeyPress: editable && !blurToSave && this.handleKeyPress,
				onBlur: editable && blurToSave && this.handleSave,
			};
			switch (this.props.editable.type) {
				case 'textarea':
					child = <textarea {...inputProps} />;
					break;
				case 'select':
					child = (
						<select {...inputProps}>
							{this.props.editable.options.map(str => <option>{str}</option>)}
						</select>
					);
					break;
				case 'checkbox':
					child = <input type="checkbox" {...inputProps} />;
					break;
				case 'datetime':
				default:
					child = <input type={this.props.editable.type} {...inputProps} />;
					break;
			}
		} else {
			child = this.props.formattedData || this.props.noDataText;
		}

		return (
			<td
				className="ubcfarm-TableCell"
				onClick={editable && editMode === 'click' && this.handleClick}
				onDoubleClick={editable && editMode === 'dblclick' && this.handleClick}
			>
				{ child }
			</td>
		);
	}
}

TableCell.propTypes = {
	formattedData: PropTypes.node,
	onSave: PropTypes.func.isRequired, // (cellValue, event) => void

	clickToSelectAndEditCell: PropTypes.bool,
	noDataText: PropTypes.node,
	editable: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({
		type: PropTypes.oneOf(['textarea', 'select', 'checkbox', 'datetime']),
		validator: PropTypes.func, // (cellValue) => boolean
		options: PropTypes.arrayOf(PropTypes.string),
	})]),
	cellEdit: PropTypes.shape({
		mode: PropTypes.oneOf(['click', 'dbclick']).isRequired,
		blurToSave: PropTypes.bool,
	}),
};
