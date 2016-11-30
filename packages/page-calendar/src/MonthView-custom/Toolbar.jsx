import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getCurrentDate, lastMonth, nextMonth } from '../redux/currentDate.js';

function Toolbar({ currentDate, onLastClick, onNextClick, onTitleClick }) {
	return (
		<header className="MonthView-Toolbar">
			<h4 className="MonthView-Toolbar-title" onClick={onTitleClick}>
				{ currentDate.display('MMMM, Y') }
			</h4>
			<button
				type="button"
				onClick={onLastClick}
				className="MonthView-Toolbar-button MonthView-Toolbar-lastbutton"
			>
				‹
			</button>
			<button
				type="button"
				onClick={onNextClick}
				className="MonthView-Toolbar-button MonthView-Toolbar-nextbutton"
			>
				›
			</button>
		</header>
	);
}

Toolbar.propTypes = {
	currentDate: PropTypes.instanceOf(moment).isRequired,
	onLastClick: PropTypes.func,
	onNextClick: PropTypes.func,
	onTitleClick: PropTypes.func,
};

export default connect(
	state => ({ currentDate: getCurrentDate(state) }),
	dispatch => bindActionCreators({
		onLastClick: lastMonth,
		onNextClick: nextMonth,
	}, dispatch),
)(Toolbar);
