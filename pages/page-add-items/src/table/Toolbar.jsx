/** @jsx createElement */
import { createElement, PropTypes } from 'react';
import { connect } from 'react-redux';
import { deleteSelected, getTable } from '../redux/table.js';
import { anySelected } from '../redux/selected.js';
import { startAdding } from '../redux/adding.js';
import exportCSV from './exportCSV.js';

const Toolbar = props => (
	<header className="inventory-Toolbar">
		<button
			onClick={props.add}
		>
			Add Inventory Item
		</button>
		<button
			onClick={props.delete}
			disabled={!props.anySelected}
		>
			Delete Item
		</button>
		<button
			onClick={props.export}
		>
			Export CSV
		</button>
	</header>
);

function exportAction() {
	return (dispatch, getState) => exportCSV(getTable(getState()));
}

export default connect(
	state => ({
		anySelected: anySelected(state),
	}),
	dispatch => ({
		delete: () => dispatch(deleteSelected()),
		add: () => dispatch(startAdding()),
		export: () => dispatch(exportAction()),
	}),
)(Toolbar);
