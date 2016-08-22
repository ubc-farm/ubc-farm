import { SubmissionError, formValueSelector } from 'redux-form';
import store from '../redux/index.js';

const selector = formValueSelector('new-person-extra');

export default function submit(initData) {
	const data = Object.assign({}, initData);
	delete data.icon;

	let target;

	switch (data.role.toLowerCase().replace(/\s/g, '')) {
		case 'employee': {
			const extra = selector(store.getState(), 'hourlyPay', 'fullOrPartTime');
			Object.assign(data, extra);

			target = '/api/employees';
			break;
		}
		case 'researcher': {
			const extra = selector(store.getState(),
				'position',
				'faculty',
				'department',
				'labWebsite',
				'expertise',
				'coursesTaught'
			);
			Object.assign(data, extra);

			target = '/api/researchers';
			break;
		}
		default:
			target = '/api/people';
			break;
	}

	return fetch(target, {
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
			return jsonStream.then(json => {
				let message = 'message' in json ? json.message : json;
				if (typeof message === 'string') message = JSON.parse(message);
				console.log(message);

				throw new SubmissionError(message);
			});
		}

		throw response;
	});
}
