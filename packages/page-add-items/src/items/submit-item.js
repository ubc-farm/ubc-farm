import { SubmissionError } from 'redux-form';
import { Money } from 'ubc-farm-utils';

export default function submit(data) {
	let { value, salvageValue } = data;
	if (value !== undefined) value = new Money(data.value);
	if (salvageValue !== undefined) salvageValue = new Money(salvageValue);

	return fetch('/api/items', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	}).then(response => {
		const jsonStream = response.json();

		if (response.ok) return jsonStream;
		else if (status === 400) {
			return jsonStream.then(json => { throw new SubmissionError(json); });
		}

		throw response;
	});
}
