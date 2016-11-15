/** @jsx createElement */
import { createElement, Component } from 'react';
import InventoryTable from './InventoryTable.jsx';
import Toolbar from './Toolbar.jsx';
import AddItem from './AddItem.jsx';

export default class TableContainer extends Component {
	constructor(props) {
		super(props);

		this.handleAdd = this.handleAdd.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = { adding: false };
	}

	handleAdd() { this.setState({ adding: true }); }
	handleSubmit() { this.setState({ adding: false }); }

	render() {
		return (
			<div className="inventory-TableContainer">
				{ props.adding ? <AddItem onSubmitSucess={this.handleSubmit} /> : null }
				<Toolbar onAdd={this.handleAdd} />
				<InventoryTable />
			</div>
		);
	}
}
