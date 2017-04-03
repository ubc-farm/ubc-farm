import { readFile } from './denodeify';
import { join, parse, extname, format, relative } from 'path';
import * as matter from 'gray-matter';
import * as Handlebars from 'handlebars';
import * as helpers from 'handlebars-helpers';
import { useLayout } from './prepareData';

helpers({ handlebars: Handlebars });

/**
 * Checks if a layout is specified in the page data.
 * @returns {boolean} true if a layout name is specified in page data
 */
function hasAssociatedLayout(data: { page?: { layout?: string } }): boolean {
	return Boolean(data.page && data.page.layout);
}

function getDestinationPath(filePath: string, folderPath: string, data): string {
	if (data.page && data.page.permalink) {
		let { permalink } = data.page;
		if (permalink.endsWith('/')) permalink = join(permalink, 'index.html');

		return permalink;
	} else {
		let result: string;
		const ext = extname(filePath);

		if (ext === '.hbs' || ext === '.handlebars') {
			const parsedPath = parse(filePath);
			result = format({ ...parsedPath, base: undefined, ext: '.html' });
		}
		else result = filePath;

		return relative(folderPath, result);
	}
}

function hasFrontMatter(matter: any, text: string) {
	return matter.test(text);
}

function getFrontMatter(
	matter: any, text: string
): { orig: string, data: any, content: string } {
	return matter(text);
}

export default async function compileFile(
	file: string, folder: string, _context
): Promise<{ out: string, path: string }> {
	let text = await readFile(file, 'utf8');

	const context = { ..._context };
	if (hasFrontMatter(matter, text)) {
		const matterResult = getFrontMatter(matter, text);
		context.page = matterResult.data;
		text = matterResult.content;
	}

	const template = Handlebars.compile(text, { noEscape: true });

	let out: string;
	if (hasAssociatedLayout(context)) {
		out = useLayout(template, context.page.layout, context);
	} else {
		out = template(context);
	}

	return { out, path: getDestinationPath(file, folder, context) };
}
