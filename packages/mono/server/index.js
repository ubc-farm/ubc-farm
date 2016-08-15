import {Server} from 'hapi';
import h2o2 from 'h2o2';

import proxyHandler from './proxy.js';
import apiProxy from './api-proxy.js';

const server = new Server();
server.connection({
	port: process.env.npm_package_config_port
});

server.register(h2o2, err => {if (err) throw err});

server.route({
	method: 'GET',
	path: '/{path*}',
	handler: proxyHandler
});

server.route(apiProxy);

export default server;