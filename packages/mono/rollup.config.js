import json from 'rollup-plugin-json';

export default {
	external(name) {
		return !name.startsWith('ubc-farm') 
		|| name.endsWith('server') || name.endsWith('api');
	},
	plugins: [json()],
	entry: 'index.js',
	sourceMap: true,
	targets: [
		{ dest: 'index.node.js', format: 'cjs' }
	]
}