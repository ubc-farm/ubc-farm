import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { getDate, getView, navigate, changeView } from '../redux/currentView.js';
import { getEvents } from '../redux/eventDB.js';

BigCalendar.momentLocalizer(moment);

export default connect(
	state => ({
		date: getDate(state),
		view: getView(state),
		events: getEvents(state),
		popup: true,
	}),
	dispatch => bindActionCreators({
		onNavigate: navigate,
		onView: changeView,
	}, dispatch),
)(BigCalendar);
