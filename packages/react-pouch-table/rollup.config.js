import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';
import nodeGlobals from 'rollup-plugin-node-globals';

export default {
	entry: 'src/index.js',
	targets: [
		{ dest: 'out/index.es.js', format: 'es' },
		{ dest: 'out/index.cjs.js', format: 'cjs' },
	],
	sourceMap: true,
	plugins: [
		nodeResolve({
			browser: true,
			preferBuiltins: false,
			jsnext: true,
			extensions: ['.js', '.ts', '.tsx'],
		}),
		commonjs({
			namedExports: {
				shortid: ['generate'],
				docuri: ['route'],
				events: ['EventEmitter'],
				lodash: ['pick', 'get', 'set'],
				'node_modules/core-js/library/modules/es6.object.to-string.js': ['default'],
				'core-js/library/modules/es6.object.to-string.js': ['default'],
				'react-dom': ['findDOMNode'],
			},
		}),
		json(),
		nodeGlobals(),
		babel({ exclude: 'node_modules/**', include: 'src/**/*.jsx' }),
	],
	external: [
		'react', //'react-virtualized',
		'react-dom',
	],
};
