import { createElement, PureComponent } from 'react'; /** @jsx createElement */
import { Invoice, Sale } from '@ubc-farm/databases';
import { IdInvoice, IdSale } from './sales-table/types';
import DetailsHeader from './details';
import Table from './sales-table'

interface FormProps {
	defaultInvoice: Invoice,
	onSubmit?(invoice: Invoice): void,
}

interface FormState {
	invoice: IdInvoice,
}

function getItems<T>(invoice: { items?: T[] }) {
	return invoice.items || [];
}

export default class InvoiceForm extends PureComponent<FormProps, FormState> {
	constructor(props: FormProps) {
		super(props);
		let i = 0;

		const invoice = { ...props.defaultInvoice };
		invoice.items = getItems(props.defaultInvoice)
			.map(sale => ({ id: Symbol(`Initial Sale Row ${i++}`), ...sale }));
		this.state = { invoice: invoice as IdInvoice };

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		if (!this.props.onSubmit) return;
		e.preventDefault();

		const result: Invoice = { ...this.state.invoice };
		result.items = getItems(this.state.invoice).map((sale: IdSale) => {
			const saleCopy = { ...sale };
			delete saleCopy.id;
			return saleCopy as Sale;
		});

		this.props.onSubmit(this.state.invoice);
	}

	handleChange(invoice: IdInvoice) {
		this.setState({ invoice });
	}

	render() {
		const childProps = {
			invoice: this.state.invoice,
			onChange: this.handleChange,
		}

		return (
			<form onSubmit={this.handleSubmit}>
				<DetailsHeader {...childProps} />
				<Table {...childProps} />
			</form>
		);
	}
}
