import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import moment from 'moment';
import { connect } from 'react-redux';
import { goToDate } from '../redux/actions';

const baseClass = 'cal-date-link';
const DateLink = props => (
	<a
		href={moment(props.date).format('#Y/MM/DD')}
		{...props}
		className={props.className ? `${baseClass} ${props.className}` : baseClass}
	/>
);

DateLink.propTypes = {
	className: PropTypes.string,
	date: PropTypes.instanceOf(moment),
};

export default connect(
	null,
	(dispatch, { date }) => ({
		onClick(e) {
			e.preventDefault();
			dispatch(goToDate(date));
		},
	})
)(DateLink);
