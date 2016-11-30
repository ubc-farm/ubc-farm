import { createElement } from 'react'; /** @jsx createElement */
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import MonthView from './MonthView/index.jsx';
import store from './redux/index.js';

render(
	<Provider store={store}>
		<MonthView />
	</Provider>,
	document.getElementById('reactRoot'),
);
