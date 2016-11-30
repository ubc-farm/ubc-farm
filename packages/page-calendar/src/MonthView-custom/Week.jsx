import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import DateElement from './Date.jsx';

export default function Week({ weekNum, currentDate, fiveDay }) {
	const copy = currentDate.clone().week(weekNum);
	return (
		<div className="MonthView-Week">
			{ new Array(7).fill().map((v, i) => {
				if (fiveDay && (i === 0 || i === 6)) return null;
				copy.weekday(i);
				const date = copy.date();
				return <DateElement key={i} date={date} currentDate={currentDate} />;
			}) }
		</div>
	);
}

Week.propTypes = {
	weekNum: PropTypes.number.isRequired,
	currentDate: PropTypes.instanceOf(Date).isRequired,
	fiveDay: PropTypes.bool,
};
