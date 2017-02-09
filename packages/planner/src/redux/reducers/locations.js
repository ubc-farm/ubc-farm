import { GET_LOCATIONS, GET_FIELDS } from '../actions/index.js';

export default function locations(state = new Map(), action) {
	switch (action.type) {
		case GET_LOCATIONS: case GET_FIELDS: {
			const { payload, error } = action;

			if (error) {
				console.error(payload);
				return state;
			}

			const copy = new Map(state);
			let data = payload;
			if (action.type === GET_FIELDS) {
				data = {};
				Object.keys(payload).forEach(id => {
					data[`field-${id}`] = {
						id: `field-${id}`,
						name: `Field ${id}`,
					};
				});
			}

			Object.keys(data).forEach(key => copy.set(key, data[key]));
			return copy;
		}
		default: return state;
	}
}
