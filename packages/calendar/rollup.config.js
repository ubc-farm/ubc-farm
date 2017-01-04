import alias from 'rollup-plugin-alias';
import babel from 'rollup-plugin-babel';
// import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
// import replace from 'rollup-plugin-replace';

export default {
	entry: 'src/index.jsx',
	sourceMap: true,
	targets: [
		{ dest: require('./package.json').browser, format: 'iife' },
	],
	plugins: [
		babel({ exclude: 'node_modules/**' }),
		nodeResolve({ browser: true, preferBuiltins: false }),
		/*replace({
			'process.env.NODE_ENV': JSON.stringify('production'),
			'process.browser': JSON.stringify(true),
		}),
		commonjs(),
		json(),
		globals(),*/
	],
	external: ['react', 'react-dom'],
	globals: {
		react: 'React',
		'react-dom': 'ReactDOM',
	},
};
