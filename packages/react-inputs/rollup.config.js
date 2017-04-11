import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
// import json from 'rollup-plugin-json';
// import nodeGlobals from 'rollup-plugin-node-globals';

const pkg = require('./package.json');

export default {
	entry: 'src/index.js',
	targets: [
		{ dest: 'out/index.es.js', format: 'es' },
		{ dest: 'out/index.cjs.js', format: 'cjs' },
	],
	sourceMap: true,
	moduleName: 'react_inputs',
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
				lodash: ['pick', 'get', 'set', 'camelCase', 'startCase'],
				'node_modules/core-js/library/modules/es6.object.to-string.js': ['default'],
				'core-js/library/modules/es6.object.to-string.js': ['default'],
				'react-dom': ['findDOMNode'],
			},
		}),
		// json(),
		// nodeGlobals(),
	],
	external: [
		...Object.keys(pkg.dependencies),
		...Object.keys(pkg.peerDependencies),
	],
	paths: {
		lodash: 'lodash-es',
	},
	banner: '/* eslint-disable */',
};
