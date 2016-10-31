import { createElement, PropTypes } from 'react';
import { classList as cx } from '@ubc-farm/utils';
/** @jsx createElement */

/** Presentational component for a button inside the toolbar */
const ToolbarButton = props => (
	<button
		type="button"
		{...props}
		className={cx('farmtable-ToolbarButton', props.className)}
	/>
);
ToolbarButton.propTypes = {	className: PropTypes.string };
export default ToolbarButton;

export const InsertButton = props => (
	<ToolbarButton {...props} className="farmtable-ToolbarButton-insert" />
);

export const DeleteButton = props => (
	<ToolbarButton {...props} className="farmtable-ToolbarButton-delete" />
);

export const SaveButton = props => (
	<ToolbarButton {...props} className="farmtable-ToolbarButton-save" />
);

export const ExportButtom = props => (
	<ToolbarButton {...props} className="farmtable-ToolbarButton-export" />
);
