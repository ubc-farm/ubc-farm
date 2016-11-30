import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import moment from 'moment';
import DateElement from './Date.jsx';

export default function Week({ weekNum, currentDate, fiveDay }) {
	const copy = moment(currentDate).week(weekNum);
	return (
		<div className="MonthView-Week">
			{ new Array(7).fill().map((v, i) => {
				if (fiveDay && (i === 0 || i === 6)) return null;
				const date = copy.clone().weekday(i);
				return <DateElement key={i} date={date} currentDate={currentDate} />;
			}) }
		</div>
	);
}

Week.propTypes = {
	weekNum: PropTypes.number.isRequired,
	currentDate: PropTypes.oneOfType([
		PropTypes.instanceOf(Date),
		PropTypes.instanceOf(moment),
	]).isRequired,
	fiveDay: PropTypes.bool,
};
