import { readFile } from './fs-awaitable';
import { join, parse } from 'path';
import { IOptions } from 'glob';
import Handlebars from 'handlebars';
import searchFolder from './searchFolder';
import parseData from './parseData';

/////

async function registerIncludes(options: IOptions): Promise<void> {
	const { cwd } = options;
	await searchFolder('includes', async file => {
		const filepath = join(cwd, file);
		const { name } = parse(file);

		const text = await readFile(filepath, 'utf8');
		Handlebars.registerPartial(name, text);
	}, options);
}

/////

const layoutFiles = new Map<string, string>();

async function prepareLayouts(options: IOptions): Promise<void> {
	const { cwd } = options;
	await searchFolder('layouts', async file => {
		const filepath = join(cwd, file);
		const { name } = parse(file);

		const text = await readFile(filepath, 'utf8');
		layoutFiles.set(name, text);
	}, options);
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

async function loadData(options: IOptions): Promise<{ [filename: string]: any }> {
	const { cwd } = options;
	const dataset = await searchFolder('_data', async file => {
		const filepath = join(cwd, file);
		const data = await parseData(filepath);
		return { filepath, data };
	}, options);

	return dataset.reduce((obj, { filename, data }) => {
		obj[filename] = data;
		return obj;
	}, {});
}

/////

export default async function prepareData(opts: IOptions, extraData: object): Promise<any> {
	const [dataFiles] = await Promise.all([
		loadData(opts),
		registerIncludes(opts),
		prepareLayouts(opts),
	]);

	const data = { ...dataFiles, ...extraData };

	return { ...opts, context: { data } };
}
