/**
 * Transforms the response depending on queries passed in the request.
 * @param {Promise} data
 * @param {Request} request
 * @param {Object} request.query
 * @param {boolean} [request.query.shallow] - if true, any non-primitive 
 * values in the data are replaced with 'true'.
 * @param {string} [request.query.print] - if equal to 'silent', a 204 response 
 * is sent instead of the data. If equal to 'pretty', the JSON response is 
 * prettified and indented with 2 spaces.
 * @param {Reply} reply
 * @returns {Response}
 */
export function transformReply(data, request, reply) {
	const {print, shallow} = getBooleanQuery(request.query, ['shallow']);

	if (shallow) {
		data = data.then(json => {
			if (typeof json === 'object' && json !== null) {
				const keys = Array.isArray(json) ? json.keys() : Object.keys(json);
				for (const key of keys) {
					const value = json[key];
					if (typeof value !== 'string' && typeof value !== 'number' 
					&& typeof value !== 'boolean' && typeof value !== 'symbol'
					&& value !== undefined && value !== null) {
						json[key] = true;
					}
				}
			}

			return json;
		})
	}

	const response = reply(data);

	if (print === 'pretty') response.spaces(2);
	else if (print === 'silent') response.code(204);
	return response;
}

/**
 * Deletes null keys from the object
 * @param {Object|Array} json
 * @returns {Object|Array}
 */
export function removeNullandUndef(json) {
	if (typeof json !== 'object' || json === null) 
		return json;

	let keys, copy;
	if (Array.isArray(json)) {
		keys = json.keys();
		copy = [...json];
	} else {
		keys = Object.keys(json);
		copy = Object.assign({}, json);
	}
	
	for (const key of keys) {
		const value = copy[key];
		if (value === null) delete copy[key];
		else if (typeof value === 'object') copy[key] = removeNullandUndef(value);
	}
	return copy;
}

/**
 * Returns an object with boolean values instead of strings.
 * 'false' is turned into false, and 'true' or '' are turned into true
 * @param {Object} query from request.query 
 * @param {string[]} filter - if specified, ignore anything not in the filter
 * @returns {Object}
 */
export function getBooleanQuery(query, filter) {
	let result = {};
	for (const prop in query) {
		const value = query[prop];
		const valid = !filter || filter.includes(prop);
		if (valid && typeof value === 'string') {
			switch(value.toLowerCase()) {
				case '': case 'true': case 'yes': case 'on': case '1':
					result[prop] = true; break;
				case 'false': case 'no': case 'off': case '0':
					result[prop] = false; break;
				default: result[prop] = value;
			}
		} else if (valid && typeof value === 'number' 
		&& (value === 0 || value === 1)) {
			result[prop] = Boolean(value);
		} else result[prop] = value;
	}
	return result;
}

export {arrayToObjectMap} from '../../utils/array-to-object.js';