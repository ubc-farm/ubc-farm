/* eslint-disable import/newline-after-import */
const denodeify = require('denodeify');
const ensureLink = denodeify(require('fs-extra').ensureLink);
const { resolve } = require('path');

module.exports = function scriptFolder({ cwd, onwarn = console.warn.bind(console) }) {
	const dest = resolve(cwd, '_site/packages/');
	const linkTo = resolve(cwd, '../');
	return ensureLink(dest, linkTo).catch((err) => {
		if (err.code !== 'EPERM') throw err;

		if (process.platform === 'win32') {
			onwarn('Must run as administrator to make link.\nAlternatively, run `mklink /J .\\packages ..\\..\\`');
		} else {
			onwarn('Must run as root to make link.\nAlternatively, run `ln -s ./packages ../../`');
		}
	});
};
