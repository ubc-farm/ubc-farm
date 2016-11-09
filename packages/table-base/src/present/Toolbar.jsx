import { createElement, PropTypes } from 'react';
/** @jsx createElement */

const Toolbar = props => (
	<header className="farmtable-Toolbar">
		{ props.insert ?
			<button
				type="button"
				className="farmtable-Toolbar-insert"
				{...props.insert}
			>
				{ props.insert.children || 'Insert Row' }
			</button>
		: null }
		{ props.delete ?
			<button
				type="button"
				className="farmtable-Toolbar-delete"
				{...props.delete}
			>
				{ props.delete.children || 'Delete Row' }
			</button>
		: null }
		{ props.export ?
			<button
				type="button"
				className="farmtable-Toolbar-delete"
				{...props.export}
			>
				{ props.export.children || 'Export CSV' }
			</button>
		: null }
		{ props.children }
	</header>
);

Toolbar.propTypes = {
	insert: PropTypes.shape({
		children: PropTypes.node,
	}),
	delete: PropTypes.shape({
		children: PropTypes.node,
	}),
	export: PropTypes.shape({
		children: PropTypes.node,
	}),
	children: PropTypes.node,
};

export default Toolbar;
