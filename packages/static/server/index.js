import { Server } from 'hapi';
import Inert from 'inert';

import __dirname from '../dirname.js';
import { config as connection } from '../package.json';

import analytics from './routes/analytics.js';

import coreCss from './routes/css-core.js';
import partialCss from './routes/css-partials.js';

import pageRoutes from './routes/pages.js';
import moduleRoutes from './routes/modules.js';

const server = new Server();
server.connection(connection);

server.path(__dirname);
server.register(Inert, err => { if (err) throw err; });

server.route(analytics);
server.route(coreCss);
server.route(partialCss);

const pagesReady = pageRoutes.then(pages => server.route(pages));
const modReady = moduleRoutes.then(mods => server.route(mods));

export default server;
export const ready =
	Promise.all([pagesReady, modReady]).then(() => server)
	.catch(err => console.error(err));
