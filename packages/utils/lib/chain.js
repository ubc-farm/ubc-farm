/**
 * Chains together functions so that the result of the last function is used
 * when calling the next function. If some other object is used, it will be used
 * as the value for the next function in the chain.
 * @param {Array<function|any>} functions
 * @returns {any} result of last function
 * @example chain(getState, getSelected) === getSelected(getState())
 * @example chain(null, JSON.stringify) === JSON.stringify(null)
 */
export default function chain(...functions) {
	return functions.reduce((lastResult, func) => (typeof func === 'function'
		? func(lastResult)
		: lastResult
	));
}
