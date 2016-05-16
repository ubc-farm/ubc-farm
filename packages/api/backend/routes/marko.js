const Promise = require('bluebird');
const path = require('path');

const folder = require('../render/folder.js');
let render = require('../render');

/**
 * A route configuration similar to koa-route Layers
 * @typedef {Object} Layer
 * @property {string|string[]} method - methods that this route accepts
 * @property {string} path - path for the route, parsed through path-to-regexp
 * @property {function|function[]} middleware - middleware used for this route
 * @property {Object} [opts] - options passed to koa-router
 * @property {string} [opts.name] - name of the route
 */

/**
 * Gets list of marko folders as routes then creates Layer routes
 * that correspond to each folder, as well as root. The route middleware
 * is in the render folder.
 * @type {Promise<Layer[]>}
 */
module.exports = folder.list(path.join(__dirname, '../../views')).then(list => {
	//TODO: Clean this up so root is handled better
	list.push('');
	return list;
}).map(name => {
	return {
		method: "GET",
		path: path.posix.join('/', name),
		middleware: render,
		opts: {name: name}
	}
});