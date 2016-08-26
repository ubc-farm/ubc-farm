export const GET_LOCATIONS = 'GET_LOCATIONS';
export const GET_FIELDS = 'GET_FIELDS';
export const GET_EQUIPMENT = 'GET_EQUIPMENT';

export function setLocations(list) {
	return { type: GET_LOCATIONS, payload: list, error: false };
}
export function locationsFailed(error) {
	return { type: GET_LOCATIONS, payload: error, error: true };
}

export function gotEquipment(payload, isError = false) {
	return { type: GET_EQUIPMENT, payload, error: isError };
}

export function gotFields(payload, isError = false) {
	return { type: GET_FIELDS, payload, error: isError };
}

function fetchAction(url, resolveAction, rejectAction = resolveAction) {
	return dispatch => fetch(url)
		.then(response => {
			if (!response.ok) throw response;
			return response.json();
		})
		.catch(err => { dispatch(rejectAction(err, true)); })
		.then(json => {
			if (json) dispatch(resolveAction(json, false));
		});
}

export function fetchLocations() {
	fetchAction('/api/fields/', setLocations, locationsFailed);
	return fetchAction('/api/locations', setLocations, locationsFailed);
}

export function fetchEquipment() {
	return fetchAction('/api/itemlist', gotEquipment);
}

export function fetchFields() {
	return fetchAction('/api/fields?shallow', gotFields);
}

