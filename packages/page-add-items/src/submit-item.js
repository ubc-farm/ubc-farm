import {SubmissionError} from 'redux-form';

export default function submit(data) {
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