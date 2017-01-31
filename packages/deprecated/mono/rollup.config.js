import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
	external(name) {
		if (name.endsWith('.js')) {
			return false;
		}	else if (name.startsWith('ubc-farm') && !name.includes('server')) {
			return false;
		}

		return true;
	},
	plugins: [
		json(),
		nodeResolve({ jsnext: true }),
	],
	entry: 'index.js',
	sourceMap: true,
	targets: [
		{ dest: 'index.node.js', format: 'cjs' },
	],
};
