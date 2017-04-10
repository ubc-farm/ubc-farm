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

	getData() {
		const { invoice, vat } = this.props;

		return {
			Subtotal: centsToString(computeSubtotal(invoice)),
			Total: centsToString(computeTotal(invoice, vat)),
			'Amount Paid': (
				<MoneyInput
					value={invoice.amountPaid}
					onChange={this.handleChange}
				/>
			),
			'Balance Due': centsToString(balanceDue(invoice, vat)),
		};
	}

	render() {
		return (
			<tfoot>
				{Object.entries(this.getData()).map(([header, element]) => (
					<tr key={header}>
						<th colSpan={4}>
							<div className="has-text-right">{header}</div>
						</th>
						<td className="price-col">{element}	</td>
						<td/>
					</tr>
				))}
			</tfoot>
		);
	}
}
