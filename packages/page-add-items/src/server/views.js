export default [
	{
		method: 'GET',
		path: '/',
		handler: {
			file: 'views/index.html',
		},
	},
	{
		method: 'GET',
		path: '/index.js',
		handler: { file: 'dist/index.js' },
	},
	{
		method: 'GET',
		path: '/index.js.map',
		handler: { file: 'dist/index.js.map' },
	},
];
