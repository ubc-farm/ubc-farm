import { createElement, SFC, ChangeEvent } from 'react'; /** @jsx createElement */
import { Invoice } from '@ubc-farm/databases';
import moment from 'moment';

interface DetailsProps {
	invoice: Partial<Invoice>,
	onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void,
}

/**
 * Diplays extra infomation not seen on paper invoices.
 */
const InvoiceExtras: SFC<DetailsProps> = ({ invoice, onChange }) => {
	const { deliveryDate, channel = '', notes = '' } = invoice;
	return (
		<div className="invoice-details">
			<div className="invoice-detail-row">
				<label htmlFor="invoice-delivery-input" className="invoice-detail-label">
					<h6 className="invoice-detail-header">Delivery Date</h6>
				</label>
				<input
					id="invoice-delivery-input" type="date"
					name="deliveryDate"
					className="invoice-details-value"
					value={deliveryDate ? moment(deliveryDate).format('Y-MM-DD') : ''}
					onChange={onChange}
				/>
			</div>

			<div className="invoice-detail-row">
				<label htmlFor="invoice-channel-input" className="invoice-detail-label">
					<h6 className="invoice-detail-header">Channel</h6>
				</label>
				<input
					id="invoice-channel-input" type="text"
					name="channel"
					className="invoice-details-value"
					value={channel} onChange={onChange}
				/>
			</div>

			<div className="invoice-detail-row">
				<label htmlFor="invoice-notes-input" className="invoice-detail-label">
					<h6 className="invoice-detail-header">Notes</h6>
				</label>
				<textarea
					id="invoice-notes-input" type="text"
					name="notes"
					className="invoice-details-value"
					value={notes} onChange={onChange}
				/>
			</div>
		</div>
	)
}

export default InvoiceExtras;
