import { createElement as h, PropTypes } from 'react'; /** @jsx h */

import Menu from './menu.js';
import navGenerator from './generator.js';

const ToolbarNav = ({ breadcrumbs }) => (
	<nav className="banner-breadcrumbs">
		<Menu />

		{[...navGenerator(breadcrumbs)]}
	</nav>
);

ToolbarNav.propTypes = {
	breadcrumbs: PropTypes.arrayOf(PropTypes.shape({
		title: PropTypes.node.isRequired,
		href: PropTypes.string,
	})).isRequired,
};

export default ToolbarNav;
