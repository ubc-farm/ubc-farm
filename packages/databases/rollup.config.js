import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';

export default {
	sourceMap: true,
	moduleName: 'databases',
	plugins: [
		nodeResolve({ browser: true, preferBuiltins: false }),
		replace({
			'process.env.NODE_ENV': JSON.stringify('production'),
			'process.browser': JSON.stringify(true),
		}),
		commonjs({
			namedExports: {
				shortid: ['generate'],
				docuri: ['route'],
			}
		}),
		json(),
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
