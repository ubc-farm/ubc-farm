import { createElement } from 'react'; /** @jsx createElement */
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import MonthView from './MonthView/index.jsx';
import BigCalendar from './calendar/BigCalendar.js';
import configureStore from './redux/index.js';
import db from './pouchdb.js';

render(
	<Provider store={configureStore(db)}>
		<div>
			<MonthView />
			<BigCalendar />
		</div>
	</Provider>,
	document.getElementById('reactRoot'),
);
