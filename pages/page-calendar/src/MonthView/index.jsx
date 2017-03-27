import { createElement } from 'react'; /** @jsx createElement */
import Toolbar from './Toolbar.jsx';
import MonthDays from './MonthDays.jsx';

const MonthView = props => (
	<div className="MonthView">
		<Toolbar />
		<MonthDays {...props} />
	</div>
);

export default MonthView;
