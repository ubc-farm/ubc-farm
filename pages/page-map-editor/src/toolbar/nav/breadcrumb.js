import { createElement as h, PropTypes } from 'react'; /** @jsx h */

const Breadcrumb = props => (
	<a className="banner-breadcrumb" {...props}>
		<h1 className="title banner-header">{props.children}</h1>
	</a>
);

Breadcrumb.propTypes = {
	children: PropTypes.node,
	href: PropTypes.string,
};

export default Breadcrumb;
