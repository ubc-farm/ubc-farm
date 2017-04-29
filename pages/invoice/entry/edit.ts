import { parsed } from 'document-promises';
import { getInvoices, Invoice } from '@ubc-farm/databases';
import { Notification } from '@ubc-farm/react-doc-editor';
import { createElement } from 'react';
import { render } from 'react-dom';
import InvoiceForm from '../src/InvoiceForm';
import openInvoice from '../src/openInvoice';

import '../www/styles/details.css';
import '../www/styles/table.css';

async function main() {
	const dbReady = getInvoices();
	const openingInvoice = dbReady.then(db => openInvoice(db));

	const [db] = await Promise.all([dbReady, parsed]);
	function back() { window.location.href = '/invoices' };
	async function submit(i: Invoice) {
		await db.put(i);
		back();
	}

	try {
		const invoice = await openingInvoice;

		render(
			createElement(InvoiceForm, { defaultInvoice: invoice, onSubmit: submit }),
			document.getElementById('reactRoot'),
		);
	} catch (err) {
		render(
			createElement(Notification, { status: 'danger', onClose: back }),
			document.getElementById('reactRoot'),
		)
		console.error(err);
	}
}
