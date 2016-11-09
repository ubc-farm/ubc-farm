import { createElement, PropTypes } from 'react';
import { omit } from 'lodash-es';
// import { classlist as cx } from '@ubc-farm/utils';
/** @jsx createElement */

/**
 * Presentational component for a table cell. If no children are set,
 * the cell will try to use the noDataText prop.
 */
const Input = props => (
	<div className="farmtable-Input-container">
		<label htmlFor={props.id} className="farmtable-Input-label">
			{ props.children }
		</label>
		<input
			{...omit(props, 'children')}
			className="farmtable-Input"
			onChange={e => props.onChange(e, props.name || props.id)}
		/>
	</div>
);

Input.propTypes = {
	className: PropTypes.string,
	id: PropTypes.string,
	name: PropTypes.string,
	children: PropTypes.node,
	onChange: PropTypes.func.isRequired,
};

export default Input;
