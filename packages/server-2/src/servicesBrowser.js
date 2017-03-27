/* eslint-env browser */

/**
 * Stores the service registry from the server in memory, and offers a key
 * val method to retrive the URL prefix of a specific service.
 * Prefix URLs should always end in a non-slash character, so it can
 * be concatenated with the desired path:
 * ``${(await ServiceRegistry.get(SERVICE))}/docs``
 */
export default class ServiceRegistry {
	/** @param {string} [servicesURL=/services] */
	constructor(servicesURL = '/services') {
		this.cache = fetch(servicesURL)
			.then(res => res.json());
	}

	/** @returns {Promise<string>} */
	get(serviceName) {
		return this.cache.then(cache => cache[serviceName]);
	}

	/** @returns {Promise<boolean>} */
	has(serviceName) {
		return this.cache.then(cache => serviceName in cache);
	}

	/**
	 * Joins the given path to the path of the provided service.
	 * Similar to `path.join()`
	 * @param {string} serviceName
	 * @param {string} somePath to join to the service path
	 * @returns {Promise<string>} joined path
	 */
	join(serviceName, somePath) {
		return this.get(serviceName).then((servicePath) => {
			if (!somePath.startsWith('/')) return `${servicePath}/${somePath}`;
			return servicePath + somePath;
		});
	}
}
