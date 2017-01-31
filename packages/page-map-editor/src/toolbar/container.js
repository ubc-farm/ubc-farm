import { createElement as h, PropTypes } from 'react'; /** @jsx h */
import Nav from './nav/nav.js';
import { Add, Publish, Resize, Delete } from './buttons/index.js';

const Toolbar = ({ breadcrumbs }) => (
	<header className="section-banner" role="toolbar">
		<Nav breadcrumbs={breadcrumbs} />

		<Add className="toolbar-button" />
		<Publish className="toolbar-button" />
		<Delete className="toolbar-button" />
		<Resize className="toolbar-button" />
	</header>
);

Toolbar.propTypes = {
	breadcrumbs: PropTypes.array,
};

export default Toolbar;
