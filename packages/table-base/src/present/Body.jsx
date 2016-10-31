import { createElement, PropTypes } from 'react';
import { classList as cx } from '@ubc-farm/utils';
/** @jsx createElement */

/** Presentational component for a tbody */
const Body = props => (
	<tbody
		{...props}
		className={cx('farmtable-Body', props.className)}
	/>
);

Body.propTypes = {
	className: PropTypes.string,
};

export default Body;
