import { createElement, PropTypes } from 'react';
import { classlist as cx } from '@ubc-farm/utils';
/** @jsx createElement */

/** Presentational component for a tbody */
const Body = props => (
	<tbody
		className={cx('farmtable-Body', props.className)}
	/>
);

Body.propTypes = {
	className: PropTypes.string,
};

export default Body;
