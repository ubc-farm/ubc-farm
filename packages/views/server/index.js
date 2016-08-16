import {Server} from 'hapi';
import Vision from 'vision';
import Handlebars from 'handlebars';

import {
	partials as partialsPath, 
	helpers as helpersPath
} from 'ubc-farm-views-utils';
import packagePages from './routes/page.js';
import homepage from './routes/home.js';

import {config as connection} from '../package.json';

const server = new Server();
server.connection(connection);
server.path(__dirname);

server.register(Vision, err => {if (err) throw err});

server.views({
	engines: {
		html: Handlebars,
		hbs: Handlebars
	},
	defaultExtension: 'html',
	relativeTo: __dirname,
	path: '.',
	partialsPath,
	helpersPath,
	isCached: process.env.NODE_ENV !== 'development'
})

server.route(packagePages);
server.route(homepage);

export default server;