import { createElement, PropTypes } from 'react';
import { classlist as cx } from '@ubc-farm/utils';
/** @jsx createElement */

/** Presentational component for a thead */
const Head = props => (
	<thead
		className={cx('farmtable-Head', props.headClassName)}
	>
		<tr className={cx('farmtable-Head-row', props.headRowClassName)}>
			{ props.children }
		</tr>
	</thead>
);

Head.propTypes = {
	children: PropTypes.node.isRequired,
	headClassName: PropTypes.string,
	headRowClassName: PropTypes.string,
};

export default Head;
