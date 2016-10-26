import minimist from 'minimist';
// eslint-disable-next-line import/no-unresolved,import/no-extraneous-dependencies
import { server as serverPromise, importPlugins } from 'ubc-farm-server';

/* eslint-disable no-console */

const { _: patterns } = minimist(process.argv.slice(2));
(async () => {
	const server = await serverPromise;
	await importPlugins(patterns, server);

	await server.start();
	const { connections } = server;
	if (connections.length === 1) {
		console.log(`Server started at ${server.info.uri}`);
	} else {
		console.log('Server started with connections: ');
		console.log(connections.map(c => c.info));
	}
/*
	// Doesn't seem to properly list plugins...
	console.log('\nPlugins loaded:');
	[server, ...connections].forEach(
		({ plugins }) => console.log(Object.keys(plugins).join(' '))
	);
*/
})();
