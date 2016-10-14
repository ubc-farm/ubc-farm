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
	targets: [
		// { dest: 'dist/index.es.js', format: 'es' },
		{ dest: 'dist/index.cjs.js', format: 'cjs' },
	],
};
