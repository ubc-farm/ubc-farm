import { interactive } from 'document-promises';
import { createElement } from 'react'; /** @jsx createElement */
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/index.js';
import TableContainer from './table/TableContainer.jsx';

interactive.then(() => render(
	<Provider store={store}>
		<TableContainer />
	</Provider>,
	document.getElementById('reactRoot'),
));
