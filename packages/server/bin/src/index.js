import minimist from 'minimist';
// eslint-disable-next-line import/no-unresolved,import/no-extraneous-dependencies
import server, { serverReady, searchPlugins } from 'ubc-farm-server';

/* eslint-disable no-console */

const { _: patterns } = minimist(process.argv.slice(2));
searchPlugins(serverReady, patterns).then(failures =>
	server.start().then(() => {
		const { connections } = server;
		if (connections.length === 1) {
			console.log(`Server started at ${server.info.uri}`);
		} else {
			console.log('Server started with connections: ');
			console.log(connections.map(c => c.info));
		}

		console.log('\nPlugins loaded:');
		connections.forEach(({ plugins }) => console.log(plugins));

		if (failures.size > 0) {
			console.warn('\nCould not load plugins:');
			for (const [path, err] of failures) {
				console.warn(`${path} ${err.name}: ${err.message}`);
			}
		}
	}).catch(err => {
		console.error('Could not start server.');
		console.error(err);
	})
);
