let router = require('koa-router')();

/**
 * Nest all children in parent router
 * @param {Router} parent 
 * @param {Router|string} children - child routers, or paths to their module
 */
function nestRouter(parent, ...children) {
	for (child of children) {
		if (typeof child == 'string') child = require(child);
		parent.use(child.routes(), child.allowedMethods());
	}
}

nestRouter(router, './marko.js', './static.js');

module.exports = router;