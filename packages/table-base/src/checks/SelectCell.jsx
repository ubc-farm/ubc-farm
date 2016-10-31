import { createElement, PropTypes } from 'react';
/** @jsx createElement */

export default function SelectCell({
	checked = false,
	onSelect,
	mode,
	clickToSelect,
	hideSelectColumn,
}) {
	if (hideSelectColumn || !mode) return null;

	return (
		<th scope="row"	className="ubcfarm-SelectCell">
			<input
				className="ubcfarm-SelectCell-input"
				type={mode}
				checked={checked}
				onChange={!clickToSelect && onSelect}
			/>
		</th>
	);
}

SelectCell.propTypes = {
	checked: PropTypes.bool,
	onSelect: PropTypes.func,
	mode: PropTypes.oneOf(['radio', 'checkbox']).isRequired,
	clickToSelect: PropTypes.bool,
	hideSelectColumn: PropTypes.bool,
};
