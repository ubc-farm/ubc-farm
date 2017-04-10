import { createElement, PureComponent } from 'react'; /** @jsx createElement */
import {
	Invoice,
	computeSubtotal,
	computeTotal,
	balanceDue,
} from '@ubc-farm/databases';
import { centsToString } from '@ubc-farm/money';
import { MoneyInput } from '@ubc-farm/react-inputs';

interface FooterProps {
	invoice: Invoice,
	vat: number,
	onChange(amountPaid: number): void,
}

export default class TableFooter extends PureComponent<FooterProps, void> {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.props.onChange(e.target.value);
	}

	render() {
		const { invoice, vat } = this.props;

		return (
			<tfoot>
				<tr>
					<th colSpan={4}>
						<div className="has-text-right">Subtotal</div>
					</th>
					<td>{centsToString(computeSubtotal(invoice))}</td>
					<td></td>
				</tr>
				<tr>
					<th colSpan={4}>
						<div className="has-text-right">Total</div>
					</th>
					<td>{centsToString(computeTotal(invoice, vat))}</td>
					<td></td>
				</tr>
				<tr>
					<th colSpan={4}>
						<div className="has-text-right">Amount Paid</div>
					</th>
					<td>
						<MoneyInput
							value={invoice.amountPaid}
							onChange={this.handleChange}
						/>
					</td>
					<td></td>
				</tr>
				<tr>
					<th colSpan={4}>
						<div className="has-text-right">Balance Due</div>
					</th>
					<td>{centsToString(balanceDue(invoice, vat))}</td>
					<td></td>
				</tr>
			</tfoot>
		);
	}
}
