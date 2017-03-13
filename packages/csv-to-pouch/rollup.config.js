export default {
	entry: 'src/index.js',
	sourceMap: true,
	targets: [
		{ dest: 'index.js', format: 'cjs' },
		{ dest: 'index.mjs', format: 'es' },
	],
	external: [
		...Object.keys(require('./package.json').dependencies),
		'fs', 'stream',
	],
};
