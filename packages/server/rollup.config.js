import json from 'rollup-plugin-json';

export default {
	external(name) {
		if (name.endsWith('.js')) {
			return false;
		}
		else if (name.startsWith('ubc-farm') && !name.includes('server')) 
			return false;
		else 
			return true;
	},
	plugins: [json()],
	entry: 'index.js',
	sourceMap: true,
	targets: [
		{ dest: 'index.node.js', format: 'cjs' }
	]
}