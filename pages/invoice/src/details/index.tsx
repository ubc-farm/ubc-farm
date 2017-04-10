import { createElement, Component, ChangeEvent } from 'react'; /** @jsx createElement */
import { Invoice } from '@ubc-farm/databases';
import moment from 'moment';

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
				<div className="columns">
					<div className="column is-half">
						<UBCAddress />
					</div>
					<div className="column is-half">
						<InvoiceDetails {...childProps} />
					</div>
				</div>
				<div className="columns">
					<div className="column is-half"/>
					<div className="column is-half">
						<InvoiceExtras {...childProps} />
					</div>
				</div>
			</header>
		);
	}
}
