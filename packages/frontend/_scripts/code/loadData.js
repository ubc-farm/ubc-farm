const promisify = require('promisify-node');
const { readFile, readdir } = promisify('fs');
const { join, extname, basename } = require('path');
const { safeLoad } = require('js-yaml');

function loadDataFile(file) {
	const filepath = join('./_data', file);
	return readFile(filepath).then((contents) => {
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

module.exports = function loadData() {
	return readdir('./_data')
		.then(files =>
			Promise.all(files.map(loadDataFile)))
		.then(dataset =>
			dataset.reduce((obj, [filename, data]) => {
				if (data !== null) obj[filename] = data;
				return obj;
			}, {}));
}
