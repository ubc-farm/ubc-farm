/* eslint-disable import/newline-after-import */
const promisify = require('promisify-node');
const { readFile } = promisify('fs');
const { join, extname, basename } = require('path');
const { safeLoad } = require('js-yaml');
const searchFolder = require('./searchFolder');

function loadDataFile(file, { cwd }) {
	const filepath = join(cwd, file);
	return readFile(filepath, 'utf8').then((contents) => {
		const ext = extname(filepath);
		const name = basename(filepath, ext);

		switch (ext) {
			case '.yaml': case '.yml':
				return [name, safeLoad(contents)];
			case '.json':
				return [name, JSON.parse(contents)];
			default:
				return [name, null];
		}
	});
}

module.exports = function loadData(options) {
	return searchFolder('_data', loadDataFile, options).then(dataset =>
		dataset.reduce((obj, [filename, data]) => {
			if (data !== null) obj[filename] = data;
			return obj;
		}, {})
	);
};
