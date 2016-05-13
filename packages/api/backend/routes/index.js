/**
 * Nest all children in parent router
 * @param {Router} parent 
 * @param {Router|string} children - child routers, or paths to their module
 */
function nestRouter(parent, ...children) {
	for (child of children) {
		if (typeof child == 'string') child = module.parent.require(child);
		parent.use(child.routes(), child.allowedMethods());
	}
}

/**
 * Add routes to router from config object
 * @param {Router} router - router to add to
 * @param {Object} config
 * @param {string|string[]} config.method - method(s) to use
 * @param {string} config.path - path for route using path-to-regexp
 * @param {function|function[]} config.handler - middleware to use
 * @param {string} [config.name] - name for route
 */
module.exports = function attachConfig(router, {method, path, handler, name}) {
	method = Array.isArray(method)? method : [method];
	method = method.map(v => v.toLowerCase());
	
	for (m of method) {
		console.log(m);
		if (name) router[m](name, path, ...handler);
		else router[m](path, ...handler);
	}
}