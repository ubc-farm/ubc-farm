import {createElement as h, PropTypes} from 'react'; /** @jsx h */
import {classlist as cx} from 'ubc-farm-utils/index.js'
import Cell from '../bits/cell.js';

/** An arrow displayed in header cells to indicate sorting direction */
const SortIcon = ({active, descending}) => (
	<i 
		className={cx(
			'material-icons md-18 table-sort-icon', 
			{'sort-active': active})
		}
		children={descending ? 'arrow_downward' : 'arrow_upward'}
	/>
);
SortIcon.propTypes = {active: PropTypes.bool, descending: PropTypes.bool};

/**
 * A header cell for the table. Two copies of the header text are created, 
 * the first can be truncated for smaller columns and the second is revealed
 * on hover to show the full text, as well as display an icon to indicate 
 * sorting is possible (if enabled).
 */
const HeaderCell = props => {
	const {children, description, align, onClick, width} = props;
	const {useSorting, active} = props;

	return (
		<Cell header 
			className='th-hoverable' 
			align={align} onClick={onClick}
			style={!useSorting ? {cursor: 'default'} : undefined}
		>
			<span className={cx('table-cell-normal', {'hidden': active})}
				style={width !== undefined ? {width} : undefined}
			>
				{children}
			</span>
			<span title={description}
				className={cx(`table-cell-hover align-${align}`, {'visible': active})}
			>
				{useSorting && align !== 'left' ? <SortIcon {...props}/> : null}
				{children}
				{useSorting && align === 'left' ? <SortIcon {...props}/> : null}
			</span>
		</Cell>
	);
}

HeaderCell.propTypes = {
	children: PropTypes.node.isRequired,
	description: PropTypes.string,
	align: PropTypes.oneOf(['left', 'center', 'right']),
	onClick: PropTypes.func,
	useSorting: PropTypes.bool,
	active: PropTypes.bool,
	descending: PropTypes.bool,
	width: PropTypes.number
}

export default HeaderCell;