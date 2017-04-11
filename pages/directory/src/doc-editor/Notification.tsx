import { createElement, SFC } from 'react'; /** @jsx createElement */
import { classlist as cx } from '@ubc-farm/utils';

interface NotificationProps {
	status?: 'primary' | 'info' | 'success' | 'warning' | 'danger',
	onClose?(): void,
	className?: string,
}

const Notification: SFC<NotificationProps> = ({ status, onClose, children, className }) => (
	<div className={cx([
		'notification',
		status && `is-${status}`,
		className,
	])}>
		<button type="button" className="delete" onClick={onClose} />
		{children}
	</div>
);

export default Notification;
