const Promise = require('bluebird');

const port = process.env.NODE_PORT || 3000;

require('./server.js').then(app => {
	app.listen(port);
})