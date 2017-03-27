import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import moment from 'moment';
import { connect } from 'react-redux';
import { getDate } from '../redux/currentView.js';

function Toolbar({ currentDate }) {
	return (
		<header className="MonthView-Toolbar">
			<h4 className="MonthView-Toolbar-title">
				{ currentDate.format('MMMM, Y') }
			</h4>
		</header>
	);
}

Toolbar.propTypes = {
	currentDate: PropTypes.instanceOf(moment).isRequired,
};

export default connect(
	state => ({ currentDate: getDate(state) }),
)(Toolbar);
