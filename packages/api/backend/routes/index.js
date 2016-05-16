/**
 * A route configuration similar to koa-route Layers
 * @typedef {Object} Layer
 * @property {string|string[]} method - methods that this route accepts
 * @property {string} path - path for the route, parsed through path-to-regexp
 * @property {function|function[]} middleware - middleware used for this route
 * @property {Object} [opts] - options passed to koa-router
 * @property {string} [opts.name] - name of the route
 */

const Promise = require('bluebird');

/**
 * Get all config arrays and objects, then covert
 * non-promises into promises.
 */
let configs = [
	require('./api.js'),
	require('./static.js'),
	require('./marko.js')
].map(val => Promise.resolve(val));

/**
 * Helper module to return route Layers from this folder as a
 * single promise that resolves with a Layer array
 * @module
 * @type {Promise<Layer[]>}
 */
module.exports = Promise.all(configs).then(layers => [].concat(...layers));