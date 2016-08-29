import analytics from './analytics.js';
import partialCss from './css-partials.js';
import coreCss from './css-core.js';
import pageRoutes from './pages.js';
import moduleRoutes from './modules.js';

export default Promise.all([
	analytics,
	partialCss,
	coreCss,
	pageRoutes,
	moduleRoutes,
]).then(routes => [].concat(...routes));
