export const SET_VIEWING = 'SET_VIEWING';

export function setViewing(date = new Date()) {
	return {type: SET_VIEWING, viewingDate: date};
}

export function setViewingDate(dateOfTheMonth) {
	return (dispatch, getState) => {
		let newViewing = new Date(getState().viewingDate);
		newViewing.setDate(dateOfTheMonth);

		return dispatch(setViewing(newViewing));
	}
}

export function adjustViewingMonth(adjustmentNumber) {
	return (dispatch, getState) => {
		let newViewing = new Date(getState().viewingDate);

		const currentMonth = newViewing.getMonth();
		newViewing.setMonth(currentMonth + adjustmentNumber);
		
		return dispatch(setViewing(newViewing));
	}
}