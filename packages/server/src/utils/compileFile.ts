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

function getDestinationPath(filePath, data): string {
	if (data.page && data.page.permalink) {
		let { permalink } = data.page;
		if (permalink.endsWith('/')) permalink = join(permalink, 'index.html');

		return permalink;
	} else {
		const ext = extname(filePath);
		if (ext === '.hbs') {
			const parsedPath = parse(filePath);
			return format({ ...parsedPath, ext: '.html' });
		}
		else return filePath;
	}
}

export default async function compileFile(
	file: string, context
): Promise<{ out: string, path: string }> {
	let text = await readFile(file, 'utf8');
	const hasFrontMatter = matter.test(text);

	context = { ...context };
	if (hasFrontMatter) {
		const matterResult = matter(text);
		context.page = matterResult.page;
		text = matterResult.content;
	}

	const template = Handlebars.compile(text, { noEscape: true });

	let out: string;
	if (hasAssociatedLayout(context)) {
		out = useLayout(template, context.page.layout, context);
	} else {
		out = template(context);
	}

	return { out, path: getDestinationPath(file, context) };
}
