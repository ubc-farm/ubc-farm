import { createElement, PropTypes } from 'react';
import Checkbox from './Checkbox.jsx';
/** @jsx createElement */
/* eslint-disable react/no-unused-prop-types */

export default function SelectHeadCell({ checked, indeterminate, selectRow }) {
	if (!selectRow) return null;
	const { mode, onSelectAll, hideSelectColumn } = selectRow;
	if (hideSelectColumn) return null;

	return (
		<th scope="col"	className="ubcfarm-SelectHeadCell">
			{mode === 'checkbox' ?
				<Checkbox
					className="ubcfarm-SelectHeadCell-input"
					checked={checked || false}
					indeterminate={indeterminate}
					onChange={onSelectAll}
				/>
			: null}
		</th>
	);
}

SelectHeadCell.propTypes = {
	checked: PropTypes.bool,
	indeterminate: PropTypes.bool,
	selectRow: PropTypes.shape({
		mode: PropTypes.oneOf(['radio', 'checkbox']).isRequired,
		clickToSelect: PropTypes.bool,
		hideSelectColumn: PropTypes.bool,
		onSelect: PropTypes.func,
	}),
};
