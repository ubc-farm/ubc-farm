/* eslint-disable import/newline-after-import */
const promisify = require('promisify-node');
const { link } = promisify('fs');
const { resolve } = require('path');

module.exports = function scriptFolder() {
	return link(resolve('_site/packages/'), resolve('../'))
}
