import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import { classlist as cx } from '@ubc-farm/utils';
import { connect } from 'react-redux';

const Item = ({
	title, subtitle,
	onChange, onClick,
	done, className,
}) => (
	<article className={cx('Agenda-Item', className)} onClick={onClick}>
		{ onChange ?
			<input
				type="checkbox"
				className="Agenda-Item-donecheck"
				checked={done}
				onChange={onChange}
			/> : null }
		<h5 className="Agenda-Item-title">{ title }</h5>
		<p className="Agenda-Item-subtitle">{ subtitle }</p>
	</article>
);

Item.propTypes = {
	title: PropTypes.node,
	subtitle: PropTypes.node,
	onClick: PropTypes.func,
	onChange: PropTypes.func,
	done: PropTypes.bool,
	className: PropTypes.string,
};

export default Item;
