import { FSWatcher } from 'fs';
import { relative, join } from 'path';
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
	switch (options.mode) {
		case 'serve':
			console.log(`Creating server`);
			const app = await server(options.port);
			console.log(`Server ready`);

			app.use((req, res, next) => {
				const { method, path: url } = req;
				const { statusCode } = res;
				console.log(`${method} ${url} ${statusCode}`);
				next();
			});
			break;
		case 'list':
			const packages = await listPagePackages();
			console.log('\nPage Packages');
			console.log('-------------');
			if (options.paths)
				packages.forEach(({ name, paths }) => {
					console.log(`+ ${name}:`);
					console.log(`    www: ${relative(process.cwd(), paths.www)}`);
					console.log(`    views: ${relative(process.cwd(), paths.views)}`);
				});
			else
				packages.forEach(({ name }) => console.log(`+ ${name}`));
			console.log('');
			break;
		case 'compile':
			const { from, to } = options;
			if (!from && !to) {
				try {
					const cwdPackage = require(join(process.cwd(), 'package.json'));
					if (cwdPackage['ubc-farm']) {
						const { www, views } = cwdPackage['ubc-farm'];
						main({
							mode: 'compile',
							from: views || 'views',
							to: www || 'www',
							watch: options.watch,
						});
						return;
					} else {
						throw new Error('Either specify --from and --to, ' +
							'or use the "ubc-farm" property in your package.json');
					}
				} catch (err) {
					if (err.code !== 'MODULE_NOT_FOUND') throw err;
					else
						throw new Error('Missing package.json. Specify --from and --to');
				}
			}
			else if (!from) throw new Error('Missing option "from"');
			else if (!to) throw new Error('Missing option "to"');

			console.log(`Compiling files in ${from}, saving to ${to}`);
			const watcher: FSWatcher = <any> await compileViews({
				from: join(process.cwd(), from),
				to: join(process.cwd(), to),
				watch: options.watch,
			});

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

	main({
		...args,
		mode: _[0],
		port: parseInt(port, 10) || undefined,
	}).catch(err => {
		console.error(err);
		process.exit(1);
	});
}
