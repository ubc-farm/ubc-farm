require('marko/node-require').install();
var Promise = require('bluebird');

/**
 * Streams out template
 * @param {string} filename - path to file
 * @param {Object} [data={}] - passed to template
 * @returns {stream.Readable} output of rendering
 */
exports.stream = function(filename, data = {}) {
	return require(filename).stream(data);
}

/**
 * Returns rendered template as promise
 * @param {string} filename - path to file
 * @param {Object} [data={}] - passed to template
 * @returns {Promise<string>} output of rendering
 */
exports.promise = function(filename, data = {}) {
	return Promise.fromCallback(cb => require(filename).render(data, cb));
}