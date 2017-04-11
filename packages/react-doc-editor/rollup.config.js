import nodeResolve from 'rollup-plugin-node-resolve';

const pkg = require('./package.json');

export default {
	entry: 'src/index.js',
	targets: [
		{ dest: 'out/index.es.js', format: 'es' },
		{ dest: 'out/index.cjs.js', format: 'cjs' },
	],
	sourceMap: true,
	plugins: [
		nodeResolve({
			browser: true,
			preferBuiltins: false,
			jsnext: true,
			extensions: ['.js', '.ts', '.tsx'],
		}),
	],
	external: [
		...Object.keys(pkg.dependencies),
		...Object.keys(pkg.peerDependencies),
	],
	banner: '/* eslint-disable */',
};
