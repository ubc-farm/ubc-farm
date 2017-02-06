/* eslint-disable import/newline-after-import */
const promisify = require('promisify-node');
const { ensureLink } = promisify('fs-extra');
const { resolve } = require('path');

module.exports = function scriptFolder({ cwd }) {
	const dest = resolve(cwd, '_site/packages/');
	const linkTo = resolve(cwd, '../');
	return ensureLink(dest, linkTo).catch((err) => {
		if (err.code !== 'EPERM') throw err;

		if (process.platform === 'win32') {
			console.warn('Must run as administrator to make link.\nAlternatively, run `mklink /J .\\packages ..\\..\\`');
		} else {
			console.warn('Must run as root to make link.\nAlternatively, run `ln -s ./packages ../../`');
		}
	});
};
