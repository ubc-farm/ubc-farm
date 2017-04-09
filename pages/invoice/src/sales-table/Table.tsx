import { createElement, PureComponent } from 'react'; /** @jsx createElement */
import { IdInvoice, IdSale } from './types';
import TableHead from './TableHead';
import TableBody from './TableBody';

interface TableProps {
	invoice: IdInvoice,
	onChange(newInvoice: IdInvoice): void,
}

interface TableState {
	editing: Set<symbol>,
}

export default class Table extends PureComponent<TableProps, TableState> {
	i: number;

	constructor(props: TableProps) {
		super(props);
		this.i = 0;

		this.state = { editing: new Set() };

		this.handleSaleChange = this.handleSaleChange.bind(this);
		this.handleSaleAdd = this.handleSaleAdd.bind(this);
		this.toggleEditing = this.toggleEditing.bind(this);
		this.deleteEditing = this.deleteEditing.bind(this);
	}

	handleSaleChange(newSales: IdSale[]) {
		this.props.onChange({
			...this.props.invoice,
			items: newSales,
		});
	}

	handleSaleAdd() {
		const toAdd: IdSale = { id: Symbol(`Sale Row ${this.i++}`) };

		const { items } = this.props.invoice;
		this.toggleEditing(toAdd.id);
		this.handleSaleChange(items
			? [...items, toAdd]
			: [toAdd]);
	}

	toggleEditing(id: symbol): void {
		this.setState(last => {
			const editing = new Set(last.editing);
			if (editing.has(id)) editing.delete(id);
			else editing.add(id);

			return { editing };
		});
	}

	deleteEditing(id: symbol): void {
		this.setState(last => {
			const editing = new Set(last.editing);
			editing.delete(id);
			return { editing };
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
					toggleEditing={this.toggleEditing}
					deleteEditing={this.deleteEditing}
				/>
			</table>
		);
	}
}
