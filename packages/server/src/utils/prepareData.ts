import { readFile } from './denodeify';
import { basename, resolve } from 'path';
import * as Handlebars from 'handlebars';
import walkFolder from './walkFolder';

/////

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

export function useLayout(html: string, layoutName = 'default', context?: any): string {
	if (!layoutFiles.has(layoutName))
		throw new Error(`${layoutName} not loaded`);

	Handlebars.registerPartial('body', html);

	const output = Handlebars.compile(layoutFiles.get(layoutName), { noEscape: true })(context);
	Handlebars.registerPartial('body', '');
	return output;
}

/////

export default async function prepareData(): Promise<any> {
	await Promise.all([
		registerIncludes(),
		prepareLayouts(),
	]);
}
