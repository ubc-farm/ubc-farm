import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';

export default {
	sourceMap: true,
	entry: 'src/api/index.js',
	dest: require('./package.json')['ubc-farm']['server-plugin'],
	format: 'cjs',
	plugins: [
		json(),
		babel({ exclude: 'node_modules/**' }),
	],
	external: ['joi', 'moment', 'pouchdb', 'pouchdb-find', 'es7-object-polyfill'],
};
