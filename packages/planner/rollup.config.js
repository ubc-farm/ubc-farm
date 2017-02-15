import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';

export default {
	sourceMap: true,
	format: 'iife',
	plugins: [
		babel({ exclude: 'node_modules/**', include: 'src/**/*.jsx' }),
		nodeResolve({ browser: true, jsnext: true }),
		replace({
			'process.env.NODE_ENV': JSON.stringify('production'),
			'process.browser': JSON.stringify(true),
		}),
		commonjs({
			namedExports: {
				shortid: ['generate'],
				docuri: ['route'],
			}
		}),
		json(),
	],
	external: ['react', 'react-dom'],
	globals: {
		react: 'React',
		'react-dom': 'ReactDOM',
	},
};
