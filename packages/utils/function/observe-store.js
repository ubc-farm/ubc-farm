/**
 * Utility for running function only when the given redux state changes.
 * @param {Store} store - store created by redux
 * @param {function} select - selector that takes the state as a param
 * and returns a subset of the state. To activate on any state change,
 * the function would be state => state.
 * @param {function} onChange - function to run on change, takes the
 * selected state and the previous selected state as its parameters.
 * @return {function} activate to unsubscribe from the store.
 * @see https://github.com/reactjs/redux/issues/303#issuecomment-125184409
 */
export default function observeStore(store, select, onChange) {
	let currentState;

	function handleChange() {
		const nextState = select(store.getState());
		if (nextState !== currentState) {
			onChange(nextState, currentState);
			currentState = nextState;
		}
	}

	const unsubscribe = store.subscribe(handleChange);
	handleChange();
	return unsubscribe;
}
