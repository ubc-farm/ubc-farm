import { createElement, PropTypes } from 'react';
import { classList as cx } from '@ubc-farm/utils';
import Checkbox from './Checkbox.jsx';
import HeadColumn from './HeadColumn.jsx';
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


export const HeadSelect = props => (
	<HeadColumn className="farmtable-Head-select">
		<Checkbox {...props} />
	</HeadColumn>
);
