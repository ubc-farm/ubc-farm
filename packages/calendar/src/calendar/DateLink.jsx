import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import moment from 'moment';
import { connect } from 'react-redux';
import { mapProps } from 'recompose';
import { goToDate } from '../redux/actions';

const baseClass = 'cal-date-link';
const DateLink = ({ date, className, onClick, children }) => (
	<a
		href={moment(date).format('#Y/MM/DD')}
		className={className ? `${baseClass} ${className}` : baseClass}
		onClick={onClick}
		children={children}
	/>
);
DateLink = mapProps(props => {
	const result = Object.assign({}, props);
	const { date, className } = props;

	delete result.date;
	result.href = moment(date).format('#Y/MM/DD');
	result.className = className ? `${baseClass} ${className}` : baseClass;
})

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
