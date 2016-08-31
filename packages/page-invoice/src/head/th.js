import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import { classlist as cx, omit } from 'ubc-farm-utils';
import { connect } from 'react-redux';
import { sortInfo } from '../redux/selectors.js';
import { changeSortTarget } from '../redux/actions/index.js';

const iconClass = 'material-icons md-18 table-sort-icon';

const HeaderCell = props => {
	const { children, title, active, dir, align = 'left' } = props;

	const iconType = dir === 'up' ? 'arrow_upward' : 'arrow_downward';
	const icon = (
		<i className={cx(iconClass, { 'sort-active': active })}>{iconType}</i>
	);

	return (
		<th
			className={cx('th-hoverable', `align-${align}`)}
			{...omit(props, 'title', 'active', 'dir', 'align', 'id')}
		>
			<span className={cx('table-cell-normal', { hidden: active })}>
				{children}
			</span>
			<span
				title={title}
				className={cx('table-cell-hover', { visible: active })}
			>
				{align !== 'left' ? icon : null}
				{children}
				{align === 'left' ? icon : null}
			</span>
		</th>
	);
};
HeaderCell.propTypes = {
	children: PropTypes.node,
	title: PropTypes.string,
	active: PropTypes.bool,
	dir: PropTypes.oneOf(['up', 'down']),
	align: PropTypes.oneOf(['left', 'center', 'right']),
};


const ConnectedHeaderCell = connect(
	(state, { id }) => {
		const { key, dir } = sortInfo(state);
		if (key !== id) return {};

		return { dir, active: true };
	},
	(dispatch, { id }) => ({
		onClick() {
			dispatch(changeSortTarget(id));
		},
	})
)(HeaderCell);

ConnectedHeaderCell.propTypes = {
	id: PropTypes.string.isRequired,
	align: PropTypes.oneOf(['left', 'center', 'right']),
	children: PropTypes.node,
	title: PropTypes.string,
};

export default ConnectedHeaderCell;
