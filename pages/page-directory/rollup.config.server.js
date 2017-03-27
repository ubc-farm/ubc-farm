import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

/* eslint-disable global-require,import/no-commonjs */

export default {
	sourceMap: true,
	entry: 'src/api/index.js',
	dest: require('./package.json')['ubc-farm']['server-plugin'],
	format: 'cjs',
	plugins: [
		json(),
		babel({ exclude: 'node_modules/**' }),
		nodeResolve(),
		commonjs({ namedExports: { docuri: ['route'] } }),
	],
	external: [
		'pouchdb', 'pouchdb-find', 'joi',
	],
	paths: {
		lodash: 'lodash-es',
	},
};
