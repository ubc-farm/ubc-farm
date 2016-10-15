import minimist from 'minimist';
// eslint-disable-next-line import/no-unresolved,import/no-extraneous-dependencies
import { serverReady, searchPlugins } from 'ubc-farm-server';

const { _: patterns } = minimist(process.argv.slice(2));

searchPlugins(serverReady, patterns).then(server => server.start());
