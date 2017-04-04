import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';
import rollupTs from 'rollup-plugin-typescript';
import typescript from 'typescript';

export default {
	entry: 'src/index.ts',
	sourceMap: true,
	moduleName: 'databases',
	targets: [
		{ dest: 'out/index.cjs.js', format: 'umd' },
		{ dest: 'out/index.es.js', format: 'es' },
	],
	plugins: [
		nodeResolve({
			jsnext: true,
			extensions: ['.js', '.ts'],
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
		rollupTs({ typescript }),
	],
	external: [
		'react', 'pouchdb', 'pouchdb-find', 'transform-pouch', 'moment', 'lodash',
	],
	globals: {
		react: 'React',
		moment: 'moment',
		pouchdb: 'PouchDB',
		lodash: '_',
	},
};
