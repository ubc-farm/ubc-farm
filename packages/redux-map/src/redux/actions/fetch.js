export const GET_LOCATIONS = 'ADD_TASK';

export function setLocations(list) {
	return { type: GET_LOCATIONS, payload: list, error: false };
}

export function locationsFailed(error) {
	return { type: GET_LOCATIONS, payload: error, error: true };
}

export function fetchLocations() {
	return dispatch => fetch('/api/locations')
		.then(response => {
			if (!response.ok) throw response;
			return response.json();
		})
		.catch(err => { dispatch(locationsFailed(err)); })
		.then(json => { dispatch(setLocations(json));	});
}
