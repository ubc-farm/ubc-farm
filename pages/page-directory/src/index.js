import { interactive } from 'document-promises';
import { createElement } from 'react'; /** @jsx createElement */
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import db from './pouchdb.js';
import configureStore from './redux/index.js';
import Directory from './table/Directory.jsx';

const store = configureStore(db);

interactive.then(() => render(
	<Provider store={store}>
		<Directory />
	</Provider>,
	document.getElementById('reactRoot'),
));
