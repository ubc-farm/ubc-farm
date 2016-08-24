import jsx from 'rollup-plugin-jsx';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';

export default {
	entry: 'src/index.js',
	sourceMap: true,
	targets: [
		{ dest: 'dist/index.iife.js', format: 'iife' },
	],
	plugins: [
		jsx({
			include: ['src/index.js', 'src/drag-drop/**'],
			factory: 'React.createElement',
			arrayChildren: false,
			passUnknownTagsToFactory: true,
		}),
		nodeResolve({ jsnext: true }),
		replace({
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
		commonjs({
			exclude: 'node_modules/moment/**',
		}),
	],
	external: ['react', 'react-dom', 'tape'],
	globals: {
		react: 'React',
		'react-dom': 'ReactDOM',
		tape: 'test',
	},
};
