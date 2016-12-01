import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import { classlist as cx } from '@ubc-farm/utils';
import moment from 'moment';

const DateHeader = ({ date }) => (
	<span
		className={cx(
			'Agenda-DateHeader',
			{ 'Agenda-DateHeader--today': date.isSame(moment(), 'day') },
		)}
	>
		<span className="Agenda-DateHeader-num">{date.format('D')}</span>
		<span className="Agenda-DateHeader-day">{date.format('ddd')}</span>
	</span>
);

DateHeader.propTypes = {
	date: PropTypes.instanceOf(moment).isRequired,
};

export default DateHeader;
