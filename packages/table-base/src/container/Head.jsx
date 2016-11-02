import { createElement, PropTypes, Component } from 'react';
import { map } from 'lodash-es';
import { classList as cx } from '@ubc-farm/utils';
import HeadBase, { HeadCell as HeadCellBase, HeadSelect } from '../present/Head.jsx';
/** @jsx createElement */

export default class Head extends Component {
	renderSelect() {
		const { props, props: { selectRow } } = this;
		if (!selectRow || !selectRow.hideSelectColumn) return null;

		if (selectRow.mode !== 'checkbox') {
			return <HeadCell className="farmtable-Head-select" />;
		}

		return (
			<HeadSelect
				onChange={props.onSelectAll}
				checked={props.isAllSelected}
				indeterminate={props.indeterminate}
			/>
		);
	}

	render() {
		const { sortName, sortOrder, headClassName, headRowClassName } = this.props;

		return (
			<HeadBase
				className={headClassName}
				rowClassName={headRowClassName}
			>
				{ this.renderSelect() }
				{ map([...this.props.columnInfo], ([key, column]) => (
					<HeadCell
						{...column}
						key={key} name={key}
						sortOrder={(column.sort && key === sortName)
							? sortOrder
							: 'none'}
						onSortChange={this.props.onSortChange}
					>
						{ column.text }
					</HeadCell>
				)) }
			</HeadBase>
		);
	}
}

Head.propTypes = {
	columnInfo: PropTypes.instanceOf(Map).isRequired,
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


export const HeadCell = props => (
	<HeadCellBase
		hidden={props.hidden}
		onClick={props.sort ?
			() => props.onSortChange(props.name)
			: undefined}
		className={cx(props.className,
			props.sort && props.sortOrder !== 'none' && [
				'farmtable-Head-cell--sort',
				`farmtable-Head-cell--sort-${props.sortOrder}`,
			])}
	/>
);

HeadCell.propTypes = {
	hidden: PropTypes.bool,
	sort: PropTypes.bool,
	className: PropTypes.string,
	onSortChange: PropTypes.func,
	sortOrder: PropTypes.oneOf(['none', 'desc', 'asc']),
	name: PropTypes.string,
};
