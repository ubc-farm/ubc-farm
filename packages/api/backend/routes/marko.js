const Promise = require('bluebird');
const path = require('path');
let router = require('koa-router')();
const folder = require('../render/folder.js');
let render = require('../render');

/*folder.list(path.join(__dirname, '../../views')).map(name => {
	router.get(name, path.posix.join('/', name), render);
}).then(module.exports = router);*/

module.exports = folder.list(path.join(__dirname, '../../views')).map(name => {
	return {
		method: "GET",
		opts: {name: name},
		path: path.posix.join('/', name),
		handler: render
	}
});