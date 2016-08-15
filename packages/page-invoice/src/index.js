import ReactDOM from 'react-dom';
import {createElement as h} from 'react'; /** @jsx h */
import {Provider} from 'react-redux';
import {domready} from 'ubc-farm-utils';
import store from './redux/index.js';

import InvoiceTable from './table/main.js';

domready.then(() => {
	ReactDOM.render(
		<Provider store={store}>
			<InvoiceTable />
		</Provider>
	, document.getElementById('app-mount'));
});
