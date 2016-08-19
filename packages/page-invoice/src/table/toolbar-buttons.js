import { createElement as h } from 'react'; /** @jsx h */
import { connect } from 'react-redux';
import { addRow, removeSelected } from '../redux/actions.js';

/** Button to add a row to the table */
const AddRow = connect()(({ dispatch }) => (
	<button type="button" onClick={() => dispatch(addRow())}>
		Add Item
	</button>
));

/** Button to deleted the selected rows in the table */
const DeleteSelected = connect()(({ dispatch }) => (
	<button type="button" onClick={() => dispatch(removeSelected())}>
		Remove Selected Items
	</button>
));

export { AddRow, DeleteSelected };
