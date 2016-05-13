const Promise = require('bluebird');
const path = require('path');
let router = module.exports = require('koa-router')();
const folder = require('../render/folder.js');
const render = require('../render');

folder.list(path.join(__dirname, '../../views')).map(name => {
	router.get(path.join('/', name), render);
})