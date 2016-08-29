import analytics from './routes/analytics.js';
import partialCss from './routes/css-partials.js';
import coreCss from './routes/css-core.js';
import pageRoutes from './routes/pages.js';
import moduleRoutes from './routes/modules.js';

export default Promise.all([
	analytics,
	partialCss,
	coreCss,
	pageRoutes,
	moduleRoutes,
]).then(routes => [].concat(...routes));
