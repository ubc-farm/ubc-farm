import json from 'rollup-plugin-json';
import { resolve } from 'path';

export default {
	entry: 'src/lookupItem.js',
	sourceMap: true,
	targets: [
		{ dest: 'dist/index.cjs.js', format: 'cjs' },
		{ dest: 'dist/index.es.js', format: 'es' },
	],
	exports: 'named',
	external(id) {
		return !id.includes('/');
	},
	plugins: [json()],
	paths: {
		[resolve(process.cwd(), './src/lookupItem.js')]: './index.cjs.js',
	},
};