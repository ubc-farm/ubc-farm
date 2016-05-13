const Promise = require('bluebird');
const path = require('path');
let router = require('koa-router')();
const folder = require('../render/folder.js');
let render = require('../render');


folder.list(path.join(__dirname, '../../views')).map(name => {
	router.get(path.posix.join('/', name), render);
})

module.exports = router;