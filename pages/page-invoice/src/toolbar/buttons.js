import { createElement } from 'react'; /** @jsx createElement */
import { connect } from 'react-redux';
import { addBlankRow, deleteSelectedRows } from '../redux/actions/index.js';

const Button = props => <button type="button" {...props} />;

export const AddButton = connect(
	undefined,
	dispatch => ({
		onClick() { dispatch(addBlankRow()); },
	}),
	(s, dispatchProps) => Object.assign({ children: 'Add Item' }, dispatchProps)
)(Button);

export const DeleteButton = connect(
	undefined,
	dispatch => ({
		onClick() { dispatch(deleteSelectedRows()); },
	}),
	(stateProps, dispatchProps) =>
		Object.assign({ children: 'Remove Selected Items' }, dispatchProps)
)(Button);
