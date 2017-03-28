import { FSWatcher } from 'fs';
import parseArgs from 'minimist';
import {
	server,
	listPagePackages,
	compileViews,
	compileAll,
} from './index';

interface ServerOptions {
	mode: 'serve',
	port?: number,
}

interface ListOptions {
	mode: 'list',
	paths?: boolean,
}

interface CompileOptions {
	mode: 'compile',
	from: string,
	to: string,
	watch?: boolean,
}

interface CompileAllOptions {
	mode: 'compileAll',
	watch?: boolean,
}

export type Options = ServerOptions | ListOptions
	| CompileOptions | CompileAllOptions;

export default async function main(options: Options) {
	try {
		switch (options.mode) {
			case 'serve':
				console.log(`Creating server`);
				const app = await server(options.port);
				console.log(`Server listening on port ${options.port}`);

				app.use((req, res, next) => {
					console.log(`${req.method}: ${req.path}`);
					next();
				});
				break;
			case 'list':
				const packages = await listPagePackages();
				console.log('Page Packages');
				console.log('-------------\n');
				if (options.paths)
					packages.forEach((path, name) => console.log(`- ${name}: ${path}`));
				else
					Array.from(packages.keys(), name => console.log(`- ${name}`));
				break;
			case 'compile':
				const { from, to } = options;
				if (!from) throw new Error('Missing option "from"');
				else if (!to) throw new Error('Missing option "to"');

				console.log(`Compiling files in ${from}, saving to ${to}`);
				const watcher: FSWatcher = <any> await compileViews(options);
				if (options.watch) {
					console.log('Inital compilation complete. Watching...');
					watcher.on('error', err => console.error(err));
					watcher.on('change', filename =>
						console.log(`Change at ${filename}, will recompile`));
				}
				break;
			case 'compileAll':
				console.log('Compiling files in all packages');
				const allWatchers: FSWatcher[] = <any> await compileAll(options);

				if (options.watch) {
					console.log('Inital compilation complete. Watching...');
					allWatchers.forEach(watch => {
						watch.on('error', err => console.error(err));
						watch.on('change', filename =>
							console.log(`Change at ${filename}, will recompile`));
					})
				}
				break;
		}
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}
}

if (require.main === module) {
	const { _, from, to, watch, paths, port } = parseArgs(process.argv, {
		boolean: ['watch', 'paths'],
		string: ['from', 'to', 'port'],
		alias: {
			from: 'f',
			to: 't',
			port: 'p',
			watch: 'w',
		},
	});
	main({ mode: _[0], from, to, watch, paths, port: parseInt(port, 10) });
}
