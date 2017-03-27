import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';

/* eslint-disable global-require,import/no-commonjs */

export default {
	sourceMap: true,
	format: 'iife',
	dest: require('package.json').browser,
	plugins: [
		babel({ exclude: 'node_modules/**' }),
		nodeResolve(),
		replace({
			'process.env.NODE_ENV': JSON.stringify('production'),
			'process.browser': JSON.stringify(true),
		}),
		commonjs({ namedExports: { docuri: ['route'] } }),
	],
	external: ['react', 'react-dom', 'tape'],
	globals: {
		react: 'React',
		'react-dom': 'ReactDOM',
		tape: 'test',
	},
	paths: {
		pouchdb: './node_modules/pouchdb/dist/pouchdb.min.js',
		lodash: 'lodash-es',
	},
};
