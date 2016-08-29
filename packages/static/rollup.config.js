import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
	entry: 'index.js',
	sourceMap: true,
	targets: [
		{ dest: 'index.node.js', format: 'cjs' },
	],
	external: [
		'hapi', 'inert',
		'path', 'tape', 'fs',
	],
	plugins: [
		json(),
		nodeResolve({ jsnext: true }),
	],
};
