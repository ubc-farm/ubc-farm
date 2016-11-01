import { createElement, PropTypes } from 'react';
import { classList as cx } from '@ubc-farm/utils';
import Checkbox from './Checkbox.jsx';
/** @jsx createElement */

/** Presentational component for a thead */
const Head = props => (
	<thead {...props} className={cx('farmtable-Head', props.className)}>
		<tr className={cx('farmtable-Head-row', props.rowClassName)}>
			{ props.children }
		</tr>
	</thead>
);
Head.propTypes = {
	className: PropTypes.string,
	rowClassName: PropTypes.string,
	children: PropTypes.node,
};
export default Head;

/** Presentational component for a th inside the thead */
export const HeadCell = props => (
	<th
		scope="col"
		{...props}
		className={cx('farmtable-Head-cell', props.className)}
	/>
);
HeadCell.propTypes = { className: PropTypes.string };

export const HeadSelect = props => (
	<HeadCell className="farmtable-Head-select">
		<Checkbox {...props} />
	</HeadCell>
);
