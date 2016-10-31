import { createElement, PropTypes } from 'react';
import { classList as cx } from '@ubc-farm/utils';
/** @jsx createElement */

/** Presentational component for a SearchBar */
const SearchBar = props => (
	<input
		{...props}
		type="search"
		className={cx('farmtable-SearchBar', props.className)}
	/>
);

SearchBar.propTypes = {
	className: PropTypes.string,
};

export default SearchBar;
