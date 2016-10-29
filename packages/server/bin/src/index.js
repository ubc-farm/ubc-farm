import minimist from 'minimist';
// eslint-disable-next-line import/no-unresolved,import/no-extraneous-dependencies
import { server as serverPromise, importPlugins } from 'ubc-farm-server';

/* eslint-disable no-console */

const argv = minimist(process.argv.slice(2), {
	boolean: ['stack'],
});

(async () => {
	if (argv._.length === 0) throw new TypeError('No plugins specified');

	const server = await serverPromise;
	const plugins = await importPlugins(argv._, server);

	server.route({
		method: 'GET',
		path: '/services',
		handler: (req, reply) => reply(plugins).type('application/json'),
	});

	await server.start();
	const { connections } = server;
	if (connections.length === 1) {
		console.log(`Server started at ${server.info.uri}`);
	} else {
		console.log('Server started with connections: ');
		console.log(connections.map(c => c.info));
	}

	// Doesn't seem to properly list plugins...
	console.log('\nPlugins loaded:');
	Object.keys(plugins).forEach(name => console.log(name));
})().catch((err) => {
	if (argv.stack) console.error(err);
	else console.error(err.message);
});
