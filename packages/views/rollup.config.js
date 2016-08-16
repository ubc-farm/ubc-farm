import json from 'rollup-plugin-json';

export default {
	entry: 'index.js',
	sourceMap: true,
	targets: [
		{ dest: 'index.node.js', format: 'cjs' },
		{ dest: 'index.es.js', format: 'es' }
	],
	external: [
		'hapi', 'vision', 'handlebars'
	],
	plugins: [json()]
};