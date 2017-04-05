import { createElement, PureComponent } from 'react'; /** @jsx createElement */
import { Invoice, Sale } from '@ubc-farm/databases';
import TableHead from './TableHead';
import TableBody from './TableBody';

interface TableProps {
	invoice: Invoice
	onChange(newInvoice: Invoice): void,
}

interface TableState {
	editing: Set<Sale>,
}

export default class Table extends PureComponent<TableProps, TableState> {
	constructor(props: TableProps) {
		super(props);

		this.state = { editing: new Set() };

		this.handleSaleChange = this.handleSaleChange.bind(this);
		this.handleSaleAdd = this.handleSaleAdd.bind(this);
		this.addEditing = this.addEditing.bind(this);
		this.deleteEditing = this.deleteEditing.bind(this);
	}

	handleSaleChange(newSales: Sale[]) {
		this.props.onChange({
			...this.props.invoice,
			items: newSales,
		});
	}

	handleSaleAdd() {
		const toAdd: Sale = {};

		const { items } = this.props.invoice;
		this.addEditing(toAdd);
		this.handleSaleChange(items
			? [...items, toAdd]
			: [toAdd]);
	}

	addEditing(sale: Sale) {
		this.setState(last => ({ editing: new Set(last.editing).add(sale) }));
	}

	deleteEditing(sale: Sale) {
		this.setState(last => {
			const editing = new Set(last.editing);
			editing.delete(sale);
			return { editing }
		});
	}

	render() {
		return (
			<table>
				<TableHead onAdd={this.handleSaleAdd} />
				<TableBody
					sales={this.props.invoice.items || []}
					onChange={this.handleSaleChange}
					editing={this.state.editing}
					addEditing={this.addEditing}
					deleteEditing={this.deleteEditing}
				/>
			</table>
		);
	}
}
