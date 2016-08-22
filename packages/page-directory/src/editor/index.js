import { createElement } from 'react'; /** @jsx createElement */
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { domready } from 'ubc-farm-utils';

import store from '../redux/index.js';
import MainForm from './person/form.js';
import ExtraForm from './extra.js';

domready.then(() => {
	ReactDOM.render(
		<Provider store={store}>
			<div>
				<MainForm id="new-person" />
				<ExtraForm />
				<button type="submit" form="new-person">
					Submit
				</button>
			</div>
		</Provider>,
		document.getElementById('app-mount')
	);
});
