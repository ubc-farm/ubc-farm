import { createElement, PropTypes } from 'react';
import { classlist as cx } from '@ubc-farm/utils';
/** @jsx createElement */

/** Presentational component for a th inside the thead */
const HeadColumn = props => (
	<th
		scope="col"
		{...props}
		className={cx('farmtable-HeadColumn', props.className)}
	/>
);

HeadColumn.propTypes = { className: PropTypes.string };

export default HeadColumn;
