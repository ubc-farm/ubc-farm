import { FSWatcher } from 'fs';
import * as parseArgs from 'minimist';
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
	mode: 'compile-all',
	watch?: boolean,
}

interface HelpOptions {
	mode: 'help'
}

export type Options = ServerOptions | ListOptions
	| CompileOptions | CompileAllOptions | HelpOptions;

const helpDialog = `
Example usage:
	ubc-farm server --port 8080
	ubc-farm list
	ubc-farm compile -f ./views -t ./www
	ubc-farm compile-all --watch
	ubc-farm help
`;

export default async function main(options: Options) {
	const { mode } = options;
	try {
		switch (options.mode) {
			case 'serve':
				console.log(`Creating server`);
				const app = await server(options.port);
				console.log(`Server listening on port ${options.port}`);

				app.use((req, res, next) => {
					res = res;
					console.log(`${req.method}: ${req.path}`);
					next();
				});
				break;
			case 'list':
				const packages = await listPagePackages(w => console.warn(w));
				console.log('\nPage Packages');
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
			case 'compile-all':
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
			case 'help':
				console.log(helpDialog);
				break;
			default:
				if (!mode) throw new Error('Missing mode argument');
				else throw new Error(`Invalid mode ${mode}`);
		}
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}
}

if (require.main === module) {
	const argv = process.argv0.includes('node')
		? process.argv.slice(2)
		: process.argv.slice(1);
	const { _, port, ...args } = parseArgs(argv, {
		boolean: ['watch', 'paths'],
		string: ['from', 'to', 'port'],
		alias: {
			from: 'f',
			to: 't',
			port: 'p',
			watch: 'w',
		},
	});
	main({ ...args, mode: _[0], port: parseInt(port, 10) });
}
