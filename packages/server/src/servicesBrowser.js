/* eslint-env browser */

let cache;

/**
 * Retrives the URL prefix for a specific service from the
 * server's service registery.
 * @param {string} name of the service
 * @return {Promise<string>} prefix URL. The prefix should always end in a
 * non-slash character, so it can be concatenated with the desired path:
 * ``${(await servicePrefix(SERVICE))}/docs``
 */
export default function servicePrefix(name) {
	if (cache) return Promise.resolve(cache[name]);

	return fetch('/services').then((map) => {
		cache = map;
		return cache[name];
	});
}
