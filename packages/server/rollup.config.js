import babel from 'rollup-plugin-babel';

export default {
	entry: 'src/index.js',
	sourceMap: true,
	external: [
		'path',
		'glob',
		'hapi',
		'inert',
		'vision',
		'handlebars',
	],
	plugins: [babel()],
	targets: [
		{ dest: 'dist/index.es.js', format: 'es' },
		{ dest: 'dist/index.cjs.js', format: 'cjs' },
	],
};
