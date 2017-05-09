import { readFile } from './denodeify';
import { join, parse, extname, format, relative } from 'path';
import * as matter from 'gray-matter';
import * as Handlebars from 'handlebars';
import * as helpers from 'handlebars-helpers';
import { useLayout } from './prepareData';

helpers({ handlebars: Handlebars });

interface DataObject {
	page?: {
		layout?: string
		permalink?: string
	}
}

/**
 * Checks if a layout is specified in the page data.
 * @returns {boolean} true if a layout name is specified in page data
 */
function hasAssociatedLayout(data: DataObject): boolean {
	return Boolean(data.page && data.page.layout);
}

/**
 * Returns the path that the file should be saved to.
 */
function getDestinationPath(
	filePath: string,
	folderPath: string,
	{ page }: DataObject,
): string {
	if (page && page.permalink) {
		// If a permalink is specified, use that path.
		let permalink = page.permalink;

		// If the permalink ends in a slash, a index.html file should be created
		// In the folder specified by the permalink.
		if (permalink.endsWith('/')) permalink = join(permalink, 'index.html');

		return permalink;
	} else {
		let result: string;
		const ext = extname(filePath);

		// If the file is a handlebars file, it should be saved as an html file
		if (ext === '.hbs' || ext === '.handlebars') {
			const parsedPath = parse(filePath);
			result = format({ ...parsedPath, base: undefined, ext: '.html' });
		}
		else result = filePath; // Otherwise just use the filepath

		return relative(folderPath, result);
	}
}

/**
 * Checks if front matter is present in the file text.
 * Wraps `matter.test`.
 */
function hasFrontMatter(matter: any, text: string) {
	return matter.test(text);
}

/**
 * Extracts front matter from a file's body.
 * Wrapps `matter`
 */
function getFrontMatter(
	matter: any, text: string
): { orig: string, data: any, content: string } {
	return matter(text);
}

export default async function compileFile(
	file: string, folder: string, _context
): Promise<{ out: string, path: string }> {
	// Read out the contents of the file
	let text = await readFile(file, 'utf8');

	const context = { ..._context };
	// Extract front matter if present
	if (hasFrontMatter(matter, text)) {
		const matterResult = getFrontMatter(matter, text);
		context.page = matterResult.data;
		text = matterResult.content;
	}

	// Compile the file text
	const template = Handlebars.compile(text, { noEscape: true });

	// Use a layout if specified, otherwise compile normally
	let out: string;
	if (hasAssociatedLayout(context))
		out = useLayout(template, context.page.layout, context);
	else
		out = template(context);

	return { out, path: getDestinationPath(file, folder, context) };
}
