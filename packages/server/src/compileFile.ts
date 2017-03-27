import { readFile } from './fs-awaitable';
import { join, parse, extname, format } from 'path';
import matter from 'gray-matter';
import Handlebars from 'handlebars';
import { useLayout } from './prepareData';

/**
 * Checks if a layout is specified in the page data.
 * @returns {boolean} true if a layout name is specified in page data
 */
function hasAssociatedLayout(data: { page?: { layout?: string } }) {
	return data.page && data.page.layout;
}

export function getDestinationPath(filePath, data): string {
	if (data.page && data.page.permalink) {
		let { permalink } = data.page;
		if (permalink.endsWith('/')) permalink = join(permalink, 'index.html');

		return permalink;
	} else {
		const ext = extname(filePath);
		if (ext === '.hbs') {
			const { dir, name } = parse(filePath);
			return format({ dir, name, ext: '.html' });
		}
		else return filePath;
	}
}

export default async function compileFile(file: string, { context, cwd }) {
	let text = await readFile(join(cwd, file), 'utf8');
	const hasFrontMatter = matter.test(text);

	const data = { ...context };
	if (hasFrontMatter) {
		const matterResult = matter(text);
		data.page = matterResult.page;
		text = matterResult.content;
	}

	const template = Handlebars.compile(text, { noEscape: true });

	if (hasAssociatedLayout(data)) {
		return useLayout(template, data.page.layout, data);
	} else {
		return template(data);
	}
}
