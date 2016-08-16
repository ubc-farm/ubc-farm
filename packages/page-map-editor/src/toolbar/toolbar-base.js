import {createElement as h, PropTypes} from 'react'; /** @jsx h */

const Arrow = () => (
	<i className='material-icons breadcrumb-icon'>keyboard_arrow_right</i>
);

const Breadcrumb = ({children, href}) => (
	<a className='banner-breadcrumb' href={href}>
		<h1 className='title banner-header'>{children}</h1>
	</a>
)
Breadcrumb.propTypes = {children: PropTypes.string, href: PropTypes.string};

const Toolbar = ({breadcrumbs, children}) => (
	<header className='section-banner' role='toolbar'>
		<nav className='banner-breadcrumbs'>
			{breadcrumbs.reduce((array, {title, href}, index) => {
				if (index !== 0) array.push(<Arrow key={`arrow-${index}`} />);
				array.push(<Breadcrumb href={href} key={title}>{title}</Breadcrumb>);
				return array;
			}, [])}
		</nav>
		{children}
	</header>
);

Toolbar.propTypes = {
	breadcrumbs: PropTypes.arrayOf(PropTypes.shape({
		title: PropTypes.node,
		href: PropTypes.string
	})).isRequired,
	children: PropTypes.node.isRequired
}

export default Toolbar;