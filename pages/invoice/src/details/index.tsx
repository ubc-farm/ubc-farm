import { createElement, Component, ChangeEvent } from 'react'; /** @jsx createElement */
import { Invoice } from '@ubc-farm/databases';
import * as moment from 'moment';

import InvoiceDetails from './InvoiceDetails';
import InvoiceExtras from './InvoiceExtras';
import UBCAddress from './UBCAddress';

interface DetailsProps {
	invoice: Invoice,
	onChange(newInvoice: Invoice): void,
}

export default class DetailsHeader extends Component<DetailsProps, void> {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e: ChangeEvent<any>) {
		let { name, value } = e.target;

		if (name === 'date' || name === 'deliveryDate') {
			value = moment(value).valueOf();
		}

		this.props.onChange({
			...this.props.invoice,
			[name]: value,
		});
	}

	render() {
		const childProps = {
			invoice: this.props.invoice,
			onChange: this.handleChange,
		};

		return (
			<header>
				<UBCAddress />
				<InvoiceDetails {...childProps} />
				<InvoiceExtras {...childProps} />
			</header>
		);
	}
}
