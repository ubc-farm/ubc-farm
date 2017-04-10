import { createElement, SFC, ChangeEvent } from 'react'; /** @jsx createElement */
import { balanceDue, Invoice } from '@ubc-farm/databases';
import { centsToString } from '@ubc-farm/money';
import moment from 'moment';

interface DetailsProps {
	invoice: Partial<Invoice>,
	onChange(e: ChangeEvent<HTMLInputElement>): void,
}

const padTop = { paddingTop: '0.375em' };

/**
 * Shows a detail box displaying the invoice id #, as well as the invoice
 * date and balance due.
 */
const InvoiceDetails: SFC<DetailsProps> = ({ invoice, onChange }) => {
	const { _id, date } = invoice;
	return (
		<div className="box">
			<div className="field is-horizontal">
				<div className="field-label">
					<label className="label">Invoice #</label>
				</div>
				<div className="field-body">
					<span style={padTop}>{_id}</span>
				</div>
			</div>

			<div className="field is-horizontal">
				<div className="field-label">
					<label className="label" htmlFor="invoice-date-input">Date</label>
				</div>
				<div className="field-body">
					<div className="field">
						<div className="control">
							<input
								id="invoice-date-input" type="date"
								name="date"
								className="input"
								value={date ? moment(date || undefined).format('Y-MM-DD') : ''}
								onChange={onChange}
							/>
						</div>
					</div>
				</div>
			</div>

			<div className="field is-horizontal">
				<div className="field-label">
					<label className="label">Balance Due</label>
				</div>
				<div className="field-body">
					<span style={padTop}>{centsToString(balanceDue(invoice))}</span>
				</div>
			</div>
		</div>
	)
}

export default InvoiceDetails;
