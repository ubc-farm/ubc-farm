import { createElement, cloneElement, Children, PureComponent, PropTypes } from 'react';
/** @jsx createElement */
import { classList as cx } from '@ubc-farm/utils';

import Checkbox from './Checkbox.jsx';

export default class TableHead extends PureComponent {
	render() {
		return (
			<thead className={cx('ubcfarm-TableHead', this.props.headClassName)}>
				<tr className={cx('ubcfarm-TableHead-row', this.props.headRowClassName)}>
					{ this.renderSelectRowColumn() }
				</tr>
			</thead>
		);
	}

	renderSelectRowColumn() {
		const { selectRow } = this.props;
		if (!selectRow || selectRow.hideSelectColumn) return null;

		let child = null;
		if (selectRow.mode === 'checkbox') {
			child = (
				<Checkbox
					onChange={this.props.onSelectAll}
					className="ubcfarm-TableHead-selectAllCheckbox"
					checked={this.props.isAllSelected}
					indeterminate={this.props.isAllSelected === 'indeterminate'}
				/>
			);
		}

		return (
			<th
				className={cx(
					'ubcfarm-TableHead-selectAllCell',
					{ 'ubcfarm-TableHead-allSelected': this.props.isAllSelected }
				)}
			>
				{ child }
			</th>
		);
	}
}

TableHead.propTypes = {
	children: PropTypes.arrayOf(PropTypes.element).isRequired,
	remote: PropTypes.bool,

	headClassName: PropTypes.string,
	headRowClassName: PropTypes.string,

	isAllSelected: PropTypes.bool,
	onSelectAll: PropTypes.func,
	selectRow: PropTypes.shape({
		mode: PropTypes.oneOf(['radio', 'checkbox']).isRequired,
		selected: PropTypes.arrayOf(PropTypes.string),
		hideSelectColumn: PropTypes.bool,
	}),

	sortName: PropTypes.string,
	sortOrder: PropTypes.oneOf(['asc', 'desc']),
	defaultSortName: PropTypes.string,
	defaultSortOrder: PropTypes.oneOf(['asc', 'desc']),

	onSortChange: PropTypes.func, // (sortName, sortOrder) => void
};
