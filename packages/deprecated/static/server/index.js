import { Server } from 'hapi';
import Inert from 'inert';

import __dirname from '../dirname.js';
import { config as connection } from '../package.json';

import routesReady from './routes/index.js';

const server = new Server();
server.connection(connection);

server.path(__dirname);
server.register(Inert, err => { if (err) throw err; });

export default server;

export const ready = routesReady
	.then(routes => server.route(routes))
	.then(() => server)
	.catch(err => console.log(err));
