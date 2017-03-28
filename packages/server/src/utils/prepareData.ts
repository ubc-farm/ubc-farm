import { readFile } from './fs-awaitable';
import { parse, resolve } from 'path';
import Handlebars from 'handlebars';
import walkFolder from './walkFolder';

/////

function registerIncludes(): Promise<void> {
	return walkFolder(
		resolve(__dirname, '../../views/_partials'),
		async filepath => {
			const { name } = parse(filepath);

			const text = await readFile(filepath, 'utf8');
			Handlebars.registerPartial(name, text);
		},
	).then(() => {});
}

/////

const layoutFiles = new Map<string, string>();

async function prepareLayouts(): Promise<void> {
	return walkFolder(
		resolve(__dirname, '../../views/_layouts'),
		async filepath => {
			const { name } = parse(filepath);

			const text = await readFile(filepath, 'utf8');
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
