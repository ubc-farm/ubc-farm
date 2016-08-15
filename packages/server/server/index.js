import {Server} from 'hapi';
import h2o2 from 'h2o2';

import staticProxy from './static-proxy.js';
import viewProxy from './view-proxy.js';
import apiProxy from './api-proxy.js';

const server = new Server();
server.connection({
	port: process.env.npm_package_config_port
});

server.register(h2o2, err => {if (err) throw err});

server.route(staticProxy);
server.route(viewProxy);
server.route(apiProxy);

export default server;