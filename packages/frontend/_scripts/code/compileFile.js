/* eslint-disable import/newline-after-import */
const denodeify = require('denodeify');
const readFile = denodeify(require('fs').readFile);
const { extname, parse, format, join } = require('path');
const Handlebars = require('handlebars');
const matter = require('gray-matter');
const marked = denodeify(require('marked'));
const { useLayout } = require('./layouts.js');

/**
 * Changes the extension of the path to .html
 * @param {string} path to modify
 * @returns {string}
 */
function asHtml(path) {
	const { dir, name } = parse(path);
	return format({ dir, name, ext: '.html' });
}

/**
 * Checks if a layout is specified in the page data.
 * @returns {boolean} true if a layout name is specified in page data
 */
function hasAssociatedLayout(data) {
	return data.page && data.page.layout;
}

function getDestinationPath(filePath, data) {
	if (data.page && data.page.permalink) {
		let { permalink } = data.page;
		if (permalink.endsWith('/')) permalink = join(permalink, 'index.html');

		return permalink;
	} else {
		const ext = extname(filePath);
		if (ext === '.md' || ext === '.hbs') return asHtml(filePath);
		else return filePath;
	}
}

/**
 * Compiles markdown file and wraps it in a layout if specified
 * @param {string} content - markdown text to compile
 * @param {Object} data to use as layout context
 */
async function compileMarkdown(content, data) {
	const body = await marked(content);

	if (hasAssociatedLayout(data)) {
		return useLayout(body, data.page.layout, data);
	} else {
		return body;
	}
}

/**
 * Compiles handlebars file and wraps it in a layout if specified
 * @param {string} content - markdown text to compile
 * @param {Object} data to use as layout context
 */
function compileHandlebars(content, data) {
	const template = Handlebars.compile(content, { noEscape: true });

	if (data.page && data.page.layout) {
		return useLayout(template, data.page.layout, data);
	} else {
		return template(data);
	}
}

/**
 * Reads the specified file then returns compiled output and a corresponding
 * filename.
 * @param {string} file path
 * @param {Object} options
 * @param {string} options.cwd
 * @param {Object} options.context
 * @returns {Promise<[string, Buffer|string]>} first element is filename, second
 * element is output
 */
module.exports = function compileFile(file, { context, cwd }) {
	return readFile(join(cwd, file)).then((buffer) => {
		let text = buffer.toString();
		const hasFrontMatter = matter.test(text);

		const data = Object.assign({}, context);
		if (hasFrontMatter) {
			const matterResult = matter(text);
			data.page = matterResult.data;
			text = matterResult.content;
		}

		const filename = getDestinationPath(file, data);

		switch (extname(file)) {
			case '.md':
				return Promise.all([filename, compileMarkdown(text, data)]);
			default:
				if (!hasFrontMatter) return [filename, buffer];
				// fall through
			case '.hbs':
				return [filename, compileHandlebars(text, data)];
		}
	});
};
