import { parsed } from 'document-promises';
import { getInvoices, Invoice } from '@ubc-farm/databases';
import { createElement } from 'react';
import { render } from 'react-dom';
import InvoiceForm from '../src/InvoiceForm';
import openInvoice from '../src/openInvoice';

const dbReady = getInvoices();
Promise.all([
	dbReady.then(db => openInvoice(db)),
	dbReady,
	parsed,
]).then(([invoice, db]) => {
	function back() { window.location.href = '/invoices' };
	async function submit(i: Invoice) {
		await db.put(i);
		back();
	}

	render(
		createElement(InvoiceForm, { defaultInvoice: invoice, onSubmit: submit }),
		document.getElementById('reactRoot'),
	);
})
