/**
 * @type {Promise<Object[]>}
 * Resolves with an array of locations
 */
export default fetch('/api/locations?array')
	.then(response => response.json())
	.then(list => list.map(location => ({
		id: location.id,
		content: location.name || ''
	})))