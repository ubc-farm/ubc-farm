import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';

export default {
	entry: 'src/index.js',
	sourceMap: true,
	targets: [
		{ dest: 'server/public/index.js', format: 'iife' }
	],
	plugins: [
		babel({ exclude: 'node_modules/**' }),
		nodeResolve(),
		replace({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		commonjs(),
	],
	external: ['react', 'react-dom'],
	globals: {
		'react': 'React',
		'react-dom': 'ReactDOM',
	}
}
