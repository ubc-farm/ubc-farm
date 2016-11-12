/** @jsx createElement */
import { createElement, Component } from 'react';
import InventoryTable from './InventoryTable.jsx';
import Toolbar from './Toolbar.jsx';
import AddItem from './AddItem.jsx';

export default class TableContainer extends Component {
	handleAdd() {
		this.setState({ adding: true });
	}

	render() {
		return (
			<div className="inventory-TableContainer">
				{ props.showForm ? <AddItem /> : null }
				<Toolbar onAdd={this.handleAdd} />
				<InventoryTable />
			</div>
		);
	}
}
