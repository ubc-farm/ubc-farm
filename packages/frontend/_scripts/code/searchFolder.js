const { Glob } = require('glob');

/**
 * @param {string} folder name
 * @param {function} cb (file: string, options: Object) => Promise<T>|T
 * @param {Object} opts
 * @returns {Promise<T[]>}
 */
module.exports = function searchFolder(folder, cb, opts) {
	let options = opts;
	let callback = cb;
	if (typeof cb === 'object' && typeof opts === 'function') {
		[options, callback] = [callback, options];
	}

	const glob = new Glob(`${folder}/**/*`, options);

	const results = new Map();
	glob.on('match', (file) => {
		if (results.has(file)) return;
		results.set(file, callback(file, options));
	});

	return new Promise((resolve, reject) =>
		glob.on('end', resolve).on('error', reject)
	).then(() =>
		Promise.all(results.values())
	);
};
