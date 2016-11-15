export default [
	{
		method: 'GET',
		path: '/',
		handler: { view: {
			template: 'index.hbs',
			context: {

			},
			options: {
				relativeTo: '../',
			},
		} },
	},
];
