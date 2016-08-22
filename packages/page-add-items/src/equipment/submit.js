import { SubmissionError } from 'redux-form';
import { fromRfcDate } from 'ubc-farm-utils/calendar/index.js';

export default function submit(initData) {
	let data = initData;
	if (data.purchaseDate) {
		data = Object.assign({}, initData, {
			purchaseDate: fromRfcDate(data.purchaseDate).getTime(),
		});
	}

	return fetch('/api/equipment', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	}).then(response => {
		const jsonStream = response.json();

		if (response.ok) return jsonStream;
		else if (response.status === 400) {
			return jsonStream.then(json => { throw new SubmissionError(json); });
		}

		throw response;
	});
}
