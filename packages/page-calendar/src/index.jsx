import { createElement } from 'react'; /** @jsx createElement */
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import MonthView from './MonthView/index.jsx';
import Agenda from './Agenda/index.jsx';
import store from './redux/index.js';

render(
	<Provider store={store}>
		<div>
			<MonthView />
			<Agenda />
		</div>
	</Provider>,
	document.getElementById('reactRoot'),
);
