import { createElement, PropTypes } from 'react';
import { omit } from 'lodash-es';
import { classlist as cx } from '@ubc-farm/utils';
import Checkbox from './Checkbox.jsx';
import HeadColumn from './HeadColumn.jsx';
/** @jsx createElement */

/** Presentational component for a thead */
const Head = props => (
	<thead
		{...omit(props, 'rowClassName')}
		className={cx('farmtable-Head', props.className)}
	>
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
