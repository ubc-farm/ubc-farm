import { Glob, IOptions } from 'glob';

type SearchCallback<T> = (file: string, options: IOptions) => Promise<T> | T;

export default function searchFolder<T>(
	folder: string,
	opts: IOptions,
	cb: SearchCallback<T>,
): Promise<T[]>
export default async function searchFolder<T>(
	folder: string,
	cb: SearchCallback<T>,
	opts?: IOptions,
): Promise<T[]> {
	let options = opts;
	let callback = cb;
	if (typeof cb === 'object' && typeof opts === 'function') {
		[options, callback] = [callback, options];
	}

	const glob = new Glob(`${folder}/**/*`, options);

	const results = new Map();
	glob.on('match', (file) => {
		if (results.has(file)) return;
		results.set(file, callback(file, options));
	});

	await new Promise((resolve, reject) =>
		glob.on('end', resolve).on('error', reject)
	);

	return Promise.all(results.values());
};
