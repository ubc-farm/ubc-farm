import { join } from 'path';
import { Server } from 'hapi';
import Inert from 'inert';
import Vision from 'vision';
import Handlebars from 'handlebars';

const showDebug = process.env.NODE_ENV === 'development' && ['error'];

/** @type {Hapi.Server} */
const server = new Server({
	connections: {
		routes: {
			cors: true,
			response: {
				emptyStatusCode: 204,
				failAction: 'log',
			},
		},
	},
	debug: { log: showDebug, request: showDebug },
});

const port = parseInt(process.env.npm_package_config_port, 10);
server.connection({
	port: Number.isNaN(port) ? null : port,
});

const plugins = [Inert, Vision];
/** @type {Promise<Hapi.Server>} resolves with the server instance */
const registration = Promise
	.all(plugins.map(plugin => server.register(plugin)))
	.then(() => server)
	.catch(console.error);

const manager = server.views({
	engines: {
		hbs: Handlebars,
	},
	defaultExtension: 'hbs',
	partialsPath: join(__dirname, '../template-partials'),
	helpersPath: join(__dirname, '../template-helpers'),
	isCached: process.env.NODE_ENV !== 'development',
	allowAbsolutePaths: true,
	context(request) {
		if (request === null) return {};
		const { path, params, query } = request;

		const depth = path.split('/').length - 1;
		const base = depth <= 1 ? '.' : `${'../'.repeat(depth - 2)}..`;

		return { base, params, query, reactRoot: '<div id="reactRoot"></div>' };
	},
});

export {
	server as default,
	registration as serverReady,
	manager as viewManager,
};
