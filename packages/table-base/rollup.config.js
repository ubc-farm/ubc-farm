import buble from 'rollup-plugin-buble';

export default {
	entry: 'index.js',
	external: ['react'],
	plugins: [buble({
		target: {chrome: 50},
		transformation: {
			destructuring: false
		}
	})],
	sourceMap: true,
	targets: [
		//{ dest: 'index.node.js', format: 'cjs' },
		{ dest: 'index.es.js', format: 'es' }
	]
};