/* eslint-disable import/newline-after-import */
const denodeify = require('denodeify');
const readFile = denodeify(require('fs').readFile);
const { join, extname, basename } = require('path');
const { safeLoad } = require('js-yaml');
const searchFolder = require('./searchFolder');

/**
 * Loads and parses YAML and JSON files, and returns its name and parsed content.
 * If the file is a different data type, null is returned as the content.
 * @param {string} file
 * @returns {Promise<[string, Object|null]>}
 */
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

module.exports = async function loadData(options) {
	const dataset = await searchFolder('_data', loadDataFile, options);

	return dataset.reduce((obj, [filename, data]) => {
		if (data !== null) obj[filename] = data;
		return obj;
	}, {});
};
