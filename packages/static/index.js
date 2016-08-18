import startServer from './node_modules/ubc-farm-utils/function/start-server.js';
import {ready} from './server/index.js';

ready.then(server => startServer(server, 'Static'));