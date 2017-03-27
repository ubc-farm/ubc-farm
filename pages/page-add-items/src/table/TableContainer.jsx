/** @jsx createElement */
import { createElement } from 'react';
import InventoryTable from './InventoryTable.jsx';
import Toolbar from './Toolbar.jsx';
import AddItem from './AddItem.jsx';

const TableContainer = () => (
	<div className="inventory-TableContainer">
		<AddItem />
		<Toolbar />
		<InventoryTable />
	</div>
);

export default TableContainer;
