import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import InvoiceForm from '../src/InvoiceForm.tsx';

storiesOf('InvoiceForm', module)
	.add('empty form', () => (
		<InvoiceForm onSubmit={action('submit')} defaultInvoice={{ _id: 1234 }} />
	));
