const { sync: resolve } = require('resolve');

function resolveHelper(mod) {
	return resolve(mod, {
		basedir: process.cwd(),
		packageFilter: ({ main, browser }) => ({ main: browser || main }),
	});
}

module.exports = function register({ handlebars }) {
	handlebars.registerHelper('resolve', resolveHelper);
}
