import {createElement} from 'react'; /** @jsx createElement */
import ReactDOM from 'react-dom';
import {domready} from 'ubc-farm-utils';

//import DatePicker from './date-picker/container.js';
import Overview from './month-overview/connected.js';
import store from './redux/index.js';
import AgendaList from './agenda-list/connected.js';

domready.then(() => {
	ReactDOM.render(
		(
		<div>
			<Overview store={store} className='agenda-overview-table' />
			<AgendaList date={new Date()} store={store}	/>
		</div>
		),
		document.getElementById('app-mount')
	);
})