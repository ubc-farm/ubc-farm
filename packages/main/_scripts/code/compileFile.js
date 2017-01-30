const promisify = require('promisify-node');
const { readFile } = promisify('fs');
const { extname, parse, format, posix } = require('path');
const Handlebars = require('handlebars');
const matter = require('gray-matter');
const marked = promisify('marked');
const { useLayout } = require('./layouts.js')

function changeExtension(ext, path) {
	const { dir, name } = parse(path);
	return format({ dir, name, ext });
}

module.exports = function compileFile(file, baseContext) {
	return readFile(file, 'utf8').then((text) => {
		const hasFrontMatter = matter.test(text);
		let filename;

		let data = Object.assign({}, baseContext);
		let content = text;
		if (hasFrontMatter) {
			const matterResult = matter(text);
			data.page = matterResult.data;
			content = matterResult.content;
		}

		const { page } = data;
		const layout = page ? page.layout : '';

		if (page && page.permalink) {
			filename = page.permalink;
			if (filename.endsWith(posix.sep)) {
				filename = posix.join(filename, 'index.html');
			}
		}

		switch (extname(file)) {
			case '.md':
				filename = changeExtension('.html', file);
				return marked(content)
					.then(html => layout ? useLayout(html, layout, data) : html)
					.then(output =>	{ filename, output, data });

			default:
				filename = filename || file;
				if (!hasFrontMatter) {
					return { filename, output: text, data, nochanges: true };
				}

				// fall through
			case '.hbs':
				filename = filename || changeExtension('.html', file);

				const template = Handlebars.compile(content);
				const output = layout
					? useLayout(template, layout, data)
					: template(content);

				return { filename, output, data };
		}
	});
}
