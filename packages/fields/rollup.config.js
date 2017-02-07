import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
// import globals from 'rollup-plugin-node-globals';

export default {
	sourceMap: true,
	format: 'iife',
	plugins: [
		babel({ exclude: 'node_modules/**', include: 'src/**/*.jsx' }),
		nodeResolve({ browser: true, preferBuiltins: false }),
		replace({
			'process.env.NODE_ENV': JSON.stringify('production'),
			'process.browser': JSON.stringify(true),
		}),
		commonjs({
			namedExports: {
				shortid: ['generate'],
				jsts: ['io'],
			}
		}),
		json(),
		// globals(),
	],
	external: ['react', 'react-dom'],
	globals: {
		react: 'React',
		'react-dom': 'ReactDOM',
	},
};
