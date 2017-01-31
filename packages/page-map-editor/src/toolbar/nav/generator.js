import { createElement as h } from 'react'; /** @jsx h */
import Breadcrumb from './breadcrumb.js';

const Arrow = () => (
	<i className="material-icons breadcrumb-icon">keyboard_arrow_right</i>
);

export default function* NavGenerator(items) {
	for (const { title, href } of items) {
		yield (<Arrow key={`arrow-${title}`} />);
		yield (<Breadcrumb href={href} key={title}>{title}</Breadcrumb>);
	}
}
