export const GET_ITEMLIST = 'GET_ITEMLIST';

export function gotItems(payload, isError = false) {
	return { type: GET_ITEMLIST, payload, error: isError };
}

export function fetchItems() {
	return dispatch => fetch('/api/itemlist')
		.then(response => response.json())
		.catch(err => dispatch(gotItems(err, true)))
		.then(json => dispatch(gotItems(json, false)));
}
