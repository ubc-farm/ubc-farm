import {
	createElement, cloneElement,
	PropTypes, Component, Children,
} from 'react';
import { classlist as cx } from '@ubc-farm/utils';
import HeadBase, { HeadSelect } from '../present/Head.jsx';
/** @jsx createElement */

export default class Head extends Component {
	renderSelect() {
		const { props, props: { selectRow, isAllSelected } } = this;
		if (!selectRow || selectRow.hideSelectColumn) return null;

		if (selectRow.mode !== 'checkbox') {
			return <HeadSelect hidden className="farmtable-Head-select" />;
		}

		return (
			<HeadSelect
				onChange={props.onSelectAll}
				checked={isAllSelected}
				indeterminate={props.indeterminate && !isAllSelected}
			/>
		);
	}

	render() {
		const { sortName, sortOrder, onSortChange } = this.props;

		return (
			<HeadBase
				className={this.props.headClassName}
				rowClassName={this.props.headRowClassName}
			>
				{ this.renderSelect() }
				{ Children.map(this.props.columns, (column) => {
					const { dataField, dataSort } = column.props;
					const extraProps = { key: dataField };
					if (dataSort) {
						const sorting = sortName === dataField && sortOrder !== 'none';
						extraProps.onHeaderClick = () => onSortChange(dataField);
						extraProps.headerClassName = cx(
							column.props.headerClassName, {
								'farmtable-HeadColumn--sort': sorting,
								[`farmtable-HeadColumn--sort-${sortOrder}`]: sorting,
							}
						);
					}

					return cloneElement(column, extraProps);
				}) }
			</HeadBase>
		);
	}
}

Head.propTypes = {
	columns: PropTypes.arrayOf(PropTypes.element),
	headClassName: PropTypes.string,
	headRowClassName: PropTypes.string,

	sortName: PropTypes.string,
	sortOrder: PropTypes.oneOf(['asc', 'desc']),
	onSortChange: PropTypes.func,

	isAllSelected: PropTypes.bool,
	indeterminate: PropTypes.bool,
	selectRow: PropTypes.shape({
		mode: PropTypes.oneOf(['radio', 'checkbox']).isRequired,
		hideSelectColumn: PropTypes.bool,
		onSelectAll: PropTypes.func, // (isAllSelected, rows) => boolean|string[]
	}),
};
