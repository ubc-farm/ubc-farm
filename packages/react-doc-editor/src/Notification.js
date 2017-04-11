import { createElement as h } from 'react'; /** @jsx createElement */
import { classlist } from '@ubc-farm/utils';

export default function Notification({ status, onClose, children, className }) {
	return h('div', {
		className: classlist(
			'notification',
			status && `is-${status}`,
			className,
		)
	},
		h('button', { type: 'button', className: 'delete', onClick: onClose }),
		children,
	);
}
