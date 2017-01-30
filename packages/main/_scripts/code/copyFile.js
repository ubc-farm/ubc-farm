const promisify = require('promisify-node');
const { readFile, readdir, writeFile, stat, mkdir } = promisify('fs');
const { createReadStream, createWriteStream } = require('fs');
const { join, extname, basename, dirname } = require('path');
const Handlebars = require('handlebars');
const matter = require('gray-matter');
const compileFile = require('./compileFile.js');

const siteDir = p => join('_site', p);
function makeDirIfMissing(dir) {
	const directory = siteDir(dir);

	return stat(directory).catch((err) => {
		if (err.code !== 'ENOENT') throw err;
		return mkdir(directory);
	});
}

function streamCopy(file, dest) {
	return new Promise((resolve, reject) =>
		createReadStream(file).pipe(createWriteStream(dest))
			.on('error', reject)
			.on('close', resolve)
	);
}

module.exports = function copyFile(file, baseContext) {
	return stat(file).then((stats) => {
		if (stats.isDirectory()) return makeDirIfMissing(file);

		return makeDirIfMissing(dirname(file))
			.then(() => compileFile(file, baseContext))
			.then(({ filename, output, nochanges }) => {
				const dest = siteDir(filename);
				return nochanges ? streamCopy(file, dest) : writeFile(dest, output);
			});
	});
}
