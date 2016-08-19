import {SubmissionError} from 'redux-form';
import Money from 'ubc-farm-utils/class/money/improved.js';

export default function submit(data) {
	if (data.value !== undefined) 
		data.value = new Money(data.value);
	if (data.salvageValue !== undefined) 
		data.salvageValue = new Money(data.salvageValue);
	
	console.log(data);

	return fetch('/api/items', {
		method: 'POST',
		body: JSON.stringify(data)
	}).then(response => {
		const json = response.json();

		if (response.ok) 
			return json;
		else if (status === 400) {
			return json.then(json => {throw new SubmissionError(json)});
		} else {
			throw response;
		}
	});
}