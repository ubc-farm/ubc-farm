/* eslint-disable import/newline-after-import */
const promisify = require('promisify-node');
const { readFile, link, symlink } = promisify('fs');
const { basename, dirname, join, posix } = require('path');
const resolve = promisify('resolve');

class LinkFileError extends Error {}

/**
 * Parses a .link file and creates a symlink between the target location
 * and the module described in the file.
 * @param {string} file path to .link file
 * @param {string} [target] path where link will be saved to. Defaults to same
 * location as .link file.
 * @returns {Promise<void>} resolves when link has been written.
 */
module.exports = function processLink(file, target = file) {
	const targetPath = join(dirname(target), basename(target, '.link'));

	return readFile(file, 'utf8').then((text) => {
		if (!text.includes(':')) {
			throw new LinkFileError('Missing ":" seperator');
		}

		const [linktype, modulePath] = text.split(':').map(str => str.trim());
		const isFolder = modulePath.endsWith('');

		let mklink;
		switch (linktype.toUpperCase()) {
			case 'HARDLINK':
				mklink = link;
				break;
			case 'SOFTLINK':
				mklink = symlink;
				break;
			default:
				throw new LinkFileError(`Invalid linktype: ${linktype} in ${basename(file)}`);
		}

		return resolve(modulePath, { basedir: posix.dirname(file) })
			.then(res => (isFolder ? dirname(res) : res))
			.then(resolvedPath => mklink(targetPath, resolvedPath));
	});
}
