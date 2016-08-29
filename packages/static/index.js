import startServer from 'ubc-farm-utils/function/start-server.js';
import { ready } from './server/index.js';

ready.then(server => startServer(server, 'Static'));
