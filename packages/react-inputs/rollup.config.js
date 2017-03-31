import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';
import nodeGlobals from 'rollup-plugin-node-globals';
import rollupTs from 'rollup-plugin-typescript';
import typescript from 'typescript';

const pkg = require('./package.json');

export default {
	entry: 'src/index.ts',
	targets: [
		{ dest: 'index.es.js', format: 'es' },
		{ dest: 'index.js', format: 'cjs' },
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
				lodash: ['pick', 'get', 'set'],
				'node_modules/core-js/library/modules/es6.object.to-string.js': ['default'],
				'core-js/library/modules/es6.object.to-string.js': ['default'],
				'react-dom': ['findDOMNode'],
			},
		}),
		json(),
		nodeGlobals(),
		rollupTs({ typescript }),
	],
	external: [
		...Object.keys(pkg.dependencies),
		...Object.keys(pkg.optionalDependencies),
	],
};
