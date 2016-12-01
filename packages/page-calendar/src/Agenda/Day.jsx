import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import { classlist as cx } from '@ubc-farm/utils';
import moment from 'moment';
import DefaultMap from './DefaultMap.js';
import Item from './Item.jsx';

// eslint-disable-next-line react/prop-types
const AgendaCell = ({ event = {}, rowSpan }) => (
	<td rowSpan={rowSpan || Math.ceil(event.length / 30)}>
		<Item
			done={event.done}
			title={event.title}
			subtitle={event.allDay ? null : event.location}
			className={cx(event.type, { 'Agenda-Item--allDay': event.allDay })}
		/>
	</td>
);

function extractTimes(eventList) {
	const result = new DefaultMap(null, Array);

	eventList.forEach((event) => {
		const start = moment(event.start);
		if (start.minute() >= 30) start.minute(30); else start.minute(0);

		const key = event.allDay ? 'allDay' : start.format('k:mm');
		const sublist = result.get(key);
		sublist.push(event);
	});

	return result;
}

export default function Day({
	events,
	dayHeader,
	className,
	twentyFour,
}) {
	const eventMap = extractTimes(events);

	return (
		<table className={cx('Agenda-Day', className)}>
			<thead className="Agenda-Day-head">
				<tr>
					<th className="Agenda-Day-marker Agenda-Day-date">
						{ dayHeader }
					</th>
					<td className="Agenda-Day-allday">
						{eventMap.get('allDay').map(event => <AgendaCell event={event} />)}
					</td>
				</tr>
			</thead>
			<tbody>
				{new Array(24).fill().reduce((rows, v, hour) => {
					const time = moment({ hour });

					const zero = (
						<tr className="Agenda-Day-row Agenda-Day-hourrow">
							<th scope="row" className="Agenda-Day-rowheader">
								{ time.format(twentyFour ? 'k:00' : 'h A') }
							</th>
							{eventMap.get(time.format('k:00'))
								.map(event => <AgendaCell event={event} />)}
						</tr>
					);

					const half = (
						<tr className="Agenda-Day-row">
							<th />
							{eventMap.get(time.format('k:00'))
								.map(event => <AgendaCell event={event} />)}
						</tr>
					);

					return rows.add(zero).add(half);
				}, new Set())}
			</tbody>
		</table>
	);
}

Day.propTypes = {
	events: PropTypes.arrayOf(PropTypes.object).isRequired,
	className: PropTypes.string,
	dayHeader: PropTypes.node.isRequired,
	twentyFour: PropTypes.bool,
};
