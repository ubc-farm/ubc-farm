import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
	entry: 'index.js',
	sourceMap: true,
	targets: [
		{ dest: 'index.node.js', format: 'cjs' },
		{ dest: 'index.es.js', format: 'es' }
	],
	external: [
		'hapi', 'vision', 'handlebars',
		'ubc-farm-views-utils'
	],
	plugins: [
		json(),
		nodeResolve({jsnext: true})
	]
};