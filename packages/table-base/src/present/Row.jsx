import { createElement, PropTypes } from 'react';
import { classlist as cx } from '@ubc-farm/utils';
/** @jsx createElement */

/**
 * Presentational component for a table row
 */
const Row = props => (
	<tr
		{...props}
		className={cx('farmtable-Row', props.className)}
	/>
);

Row.propTypes = {
	className: PropTypes.string,
};

export default Row;
