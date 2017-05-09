import { readFile } from './denodeify';
import { basename, resolve } from 'path';
import * as Handlebars from 'handlebars';
import walkFolder from './walkFolder';

/////

/** Locate partials and register them to handlebars */
function registerIncludes(): Promise<void> {
	return walkFolder(
		resolve(__dirname, '../../views/_partials'),
		async entryInfo => {
			const name = basename(entryInfo.name);

			const text = await readFile(entryInfo.fullPath, 'utf8');
			Handlebars.registerPartial(name, text);
		},
	).then(() => {});
}

/////

const layoutFiles = new Map<string, string>();

/** Locate layouts save them to the layoutFiles map */
async function prepareLayouts(): Promise<void> {
	return walkFolder(
		resolve(__dirname, '../../views/_layouts'),
		async entry => {
			const name = basename(entry.name);

			const text = await readFile(entry.fullParentDir, 'utf8');
			layoutFiles.set(name, text);
		},
	).then(() => {});
}

/**
 * Compile a file with a layout through handlebars.
 * @param html - file body to be compiled
 * @param layoutName - name of the layout. The body of the layout is loaded
 * from the `layoutFiles` map
 * @param context - context for handlebars to use
 */
export function useLayout(html: string, layoutName = 'default', context?: any): string {
	if (!layoutFiles.has(layoutName))
		throw new Error(`${layoutName} not loaded`);

	// `body` is a temporary partial that contains the file body,
	// so that the layout can specify where the body is placed.
	Handlebars.registerPartial('body', html);

	const output = Handlebars.compile(layoutFiles.get(layoutName), { noEscape: true })(context);
	Handlebars.registerPartial('body', ''); // Remove the temporary partial
	return output;
}

/////

export default async function prepareData(): Promise<void> {
	await Promise.all([
		registerIncludes(),
		prepareLayouts(),
	]);
}
