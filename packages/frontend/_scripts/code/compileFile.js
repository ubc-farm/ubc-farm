/* eslint-disable import/newline-after-import */
const promisify = require('promisify-node');
const { readFile } = promisify('fs');
const { extname, parse, format, join } = require('path');
const Handlebars = require('handlebars');
const matter = require('gray-matter');
const marked = promisify('marked');
const { useLayout } = require('./layouts.js');

function asHtml(path) {
	const { dir, name } = parse(path);
	return format({ dir, name, ext: '.html' });
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

function compileMarkdown(content, data) {
	const html = marked(content);
	if (data.page && data.page.layout) {
		return html.then(body => useLayout(body, data.page.layout, data));
	} else {
		return html;
	}
}

function compileHandlebars(content, data) {
	const template = Handlebars.compile(content, { noEscape: true });

	if (data.page && data.page.layout) {
		return useLayout(template, data.page.layout, data);
	} else {
		return template(data);
	}
}

/**
 * @param {string} file path
 * @param {Object} options
 * @param {string} options.cwd
 * @param {Object} options.context
 * @returns {Promise<Array>}
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
