import { integer, uuid, words, dateIn, boolean } from 'benthos';
import moment from 'moment';
import { times } from 'lodash';

export function EventSchema() {
	const start = moment(dateIn('month'));
	const end = start.clone().add(integer(0, 2000), 'hours');

	return {
		start,
		end,
		_id: uuid(),
		title: words(integer(1, 5)),
		allDay: boolean(),
	};
}

export default function generateEvents(count = integer(0, 1000)) {
	return times(count, EventSchema);
}
