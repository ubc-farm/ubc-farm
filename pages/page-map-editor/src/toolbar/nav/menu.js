import { createElement as h, PureComponent } from 'react'; /** @jsx h */

const isClient = Boolean(
  (typeof window !== 'undefined' &&
  window.document && window.document.createElement)
);

const MenuBase = props => (
	<a className="banner-breadcrumb" href="/" title="Menu" {...props}>
		<i className="material-icons">menu</i>
	</a>
);

export default class Menu extends PureComponent {
	constructor(props) {
		super(props);

		// this.handleClick = this.handleClick.bind(this);
		this.state = { open: false };
	}

	render() {
		if (!isClient) return <MenuBase />;

		// TODO: Open a slide out menu
		return <MenuBase />;
	}
}
