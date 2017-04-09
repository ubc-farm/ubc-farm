import { createElement, SFC, ChangeEvent } from 'react'; /** @jsx createElement */
import { balanceDue, Invoice } from '@ubc-farm/databases';
import moment from 'moment';

interface DetailsProps {
	invoice: Partial<Invoice>,
	onChange(e: ChangeEvent<HTMLInputElement>): void,
}

/**
 * Shows a detail box displaying the invoice id #, as well as the invoice
 * date and balance due.
 */
const InvoiceDetails: SFC<DetailsProps> = ({ invoice, onChange }) => {
	const { _id, date } = invoice;
	return (
		<div className="invoice-details">
			<div className="invoice-detail-row">
				<span className="invoice-detail-label">
					<h6 className="invoice-detail-header">Invoice #</h6>
				</span>
				<span className="invoice-detail-value">
					{_id}
				</span>
			</div>

			<div className="invoice-detail-row">
				<label htmlFor="invoice-date-input" className="invoice-detail-label">
					<h6 className="invoice-detail-header">Date</h6>
				</label>
				<input
					id="invoice-date-input" type="date"
					name="date"
					className="invoice-detail-value"
					value={date ? moment(date || undefined).format('Y-MM-DD') : ''}
					onChange={onChange}
				/>
			</div>

			<div className="invoice-detail-row">
				<label className="invoice-detail-label">
					<h6 className="invoice-detail-header">Balance Due</h6>
				</label>
				<span className="invoice-detail-value">
					{balanceDue(invoice)}
				</span>
			</div>
		</div>
	)
}

export default InvoiceDetails;
