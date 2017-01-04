import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { times } from 'lodash';
import sortEvents from '../utils/sortEvents.js';

TimetableEvent = ({ length, title }) => (
	<td className="cal-event cal-sch-event" colSpan={length}>
		<a className="cal-event-title cal-sch-event-title">
			{title}
		</a>
	</td>
);
TimetableEvent.propTypes = {
	length: PropTypes.number.isRequired,
	title: PropTypes.string,
};


const TimetableRow = ({ cells }) => (
	<tr>
		{cells.map(cell => <TimetableEvent {...cell} />)}
	</tr>
);

function minutesToLength(mins) {
	const hours = mins / 60;
	let length = Math.floor(hours);
	if (length < 0) throw new Error('Negative time');

	if (hours < length + .5) return length;
	else return length + .5;
}
function timeToIndex(time) {
	let index = base = time.hour() * 2;
	if (time.minute() > 30) index += 1;
	return index;
}
TimetableRow = mapProps(({ events }) => {
	const cells = [];
	sortEvents(events).forEach((event) => {
		const { start, end } = event;
		cells[timeToIndex(start)] = Object.assign({}, event, {
			length: end ? minutesToLength(start.diff(end)) : 2,
		});
	});

	let seenCell = false;
	for (let i = cells.length - 1; i >= 0; i -= 1) {
		const emptyItem = cells[i] === undefined;
		if (!seenCell) {
			if (!emptyItem) seenCell = true;
		} else if (emptyItem) {
			cells[i] = null;
		}
	}

	return { cells };
})(TimetableRow);
