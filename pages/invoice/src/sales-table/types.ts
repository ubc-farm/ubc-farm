import { Invoice, Sale } from '@ubc-farm/databases';

export interface IdSale extends Sale {
	id: symbol,
}

export interface IdInvoice extends Invoice {
	items?: IdSale[],
}
