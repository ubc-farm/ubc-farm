import json from 'rollup-plugin-json';

export default {
	entry: 'index.js',
	sourceMap: true,
	targets: [
		{ dest: 'index.node.js', format: 'cjs' }
	],
	external: [
		'hapi', 'inert',
		'path', 'tape'
	],
	plugins: [json()]
};