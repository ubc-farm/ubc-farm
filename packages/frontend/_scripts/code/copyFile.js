/* eslint-disable import/newline-after-import */
const promisify = require('promisify-node');
const { writeFile, stat, mkdir } = promisify('fs');
const { join, dirname } = require('path');
const compileFile = require('./compileFile.js');

const siteDir = p => join('_site', p);
function makeDirIfMissing(dir) {
	const directory = siteDir(dir);

	return stat(directory).catch((err) => {
		if (err.code !== 'ENOENT') throw err;
		return mkdir(directory);
	});
}

module.exports = function copyFile(file, baseContext) {
	return stat(file).then((stats) => {
		if (stats.isDirectory()) return makeDirIfMissing(file);

		return makeDirIfMissing(dirname(file))
			.then(() => compileFile(file, baseContext))
			.then(({ filename, output }) => {
				const dest = siteDir(filename);
				return output ? writeFile(dest, output) : false;
			});
	});
}
