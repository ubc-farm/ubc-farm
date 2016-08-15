import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
	entry: 'index.js',
	sourceMap: true,
	targets: [
		{ dest: 'index.node.js', format: 'cjs' },
		{ dest: 'index.es.js', format: 'es' }
	],
	external: [
		'hapi', 'vision', 'inert', 'h202', 'boom', 'joi',
		'knex', 'pg', 'objection',
		'path', 'url'
	],
	plugins: [
		nodeResolve({jsnext: true}),
		commonjs({
			include: [
				'node_modules/**',
				'database/_migrations/**',
				'database/_seeds/**',
				'knexfile.js'
			]
		})
	]
};