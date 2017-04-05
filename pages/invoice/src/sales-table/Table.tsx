import { createElement, PureComponent } from 'react'; /** @jsx createElement */
import { Invoice, Sale } from '@ubc-farm/databases';
import TableHead from './TableHead';
import TableBody from './TableBody';

interface TableProps {
	invoice: Invoice
	onChange(newInvoice: Invoice): void,
}

export default class Table extends PureComponent<TableProps, void> {
	constructor(props) {
		super(props);

		this.handleSaleChange = this.handleSaleChange.bind(this);
		this.handleSaleAdd = this.handleSaleAdd.bind(this);
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
		this.handleSaleChange(items
			? [...items, toAdd]
			: [toAdd]);
	}

	render() {
		return (
			<table>
				<TableHead onAdd={this.handleSaleAdd} />
				<TableBody
					sales={this.props.invoice.items || []}
					onChange={this.handleSaleChange}
				/>
			</table>
		);
	}
}
