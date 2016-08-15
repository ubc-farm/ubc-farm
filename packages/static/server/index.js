import {resolve} from 'path';
import {Server} from 'hapi';
import Inert from 'inert';

import analytics from './routes/analytics.js';
import coreCss from './routes/css-core.js';
import partialCss from './routes/css-partials.js';

const connection = {
	port: process.env.npm_package_config_port
};

const server = new Server();
server.connection(connection);

server.path(resolve(__dirname, '../'));
server.register(Inert, err => {if (err) throw err});

server.route(analytics);
server.route(coreCss);
server.route(partialCss);

export default server;