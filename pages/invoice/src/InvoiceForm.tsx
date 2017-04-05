import { createElement, PureComponent } from 'react'; /** @jsx createElement */
import { Invoice } from '@ubc-farm/databases';

import DetailsHeader from './details';
import Table from './sales-table'

interface FormProps {
	defaultInvoice: Invoice,
	onSubmit?(invoice: Invoice): void,
}

interface FormState {
	invoice: Invoice,
}

export default class InvoiceForm extends PureComponent<FormProps, FormState> {
	constructor(props: FormProps) {
		super(props);
		this.state = { invoice: props.defaultInvoice }

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		if (this.props.onSubmit) {
			e.preventDefault();
			this.props.onSubmit(this.state.invoice);
		}
	}

	handleChange(invoice: Invoice) {
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
