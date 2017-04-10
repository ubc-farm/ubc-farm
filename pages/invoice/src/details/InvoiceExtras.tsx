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
		<div className="box">
			<div className="field is-horizontal">
				<div className="field-label">
					<label className="label" htmlFor="invoice-delivery-input">
						Delivery Date
					</label>
				</div>
				<div className="field-body">
					<div className="field">
						<div className="control">
							<input
								id="invoice-delivery-input" type="date"
								name="deliveryDate"
								className="input"
								value={deliveryDate ? moment(deliveryDate).format('Y-MM-DD') : ''}
								onChange={onChange}
							/>
						</div>
					</div>
				</div>
			</div>

			<div className="field is-horizontal">
				<div className="field-label">
					<label className="label" htmlFor="invoice-channel-input">
						Channel
					</label>
				</div>
				<div className="field-body">
					<div className="field">
						<div className="control">
							<input
								id="invoice-channel-input" type="text"
								name="channel"
								className="input"
								value={channel} onChange={onChange}
							/>
						</div>
					</div>
				</div>
			</div>

			<div className="field is-horizontal">
				<div className="field-label">
					<label className="label" htmlFor="invoice-notes-input">Notes</label>
				</div>
				<div className="field-body">
					<div className="field">
						<div className="control">
							<textarea
								id="invoice-notes-input" type="text"
								name="notes"
								className="textarea"
								value={notes} onChange={onChange}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default InvoiceExtras;
