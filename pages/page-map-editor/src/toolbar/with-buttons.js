import {createElement as h, PropTypes} from 'react'; /** @jsx h */
import BaseToolbar from './toolbar-base.js';

const Toolbar = ({
	breadcrumbs,
	adding = false, onAdd,
	resizing = false, onResize
}) => (
	<BaseToolbar breadcrumbs={breadcrumbs}>
		<label role='button' className='button toolbar-button'>
			<i className='material-icons'>add</i>
			Add
			<input type='checkbox'
				checked={adding}
				onChange={onAdd}
				hidden
				className='hidden-checkbox'
			/>
		</label>
		<section className='sidebar-toolbar'>
			<label role='button' className='button toolbar-button'>
				<i className='material-icons'>transform</i>
				Resize
				<input type='checkbox'
					checked={resizing}
					onChange={onResize}
					hidden
					className='hidden-checkbox'
				/>
			</label>
		</section>
	</BaseToolbar>
)

Toolbar.propTypes = {
	breadcrumbs: PropTypes.arrayOf(PropTypes.shape({
		title: PropTypes.node,
		href: PropTypes.string
	})),
	adding: PropTypes.bool,
	resizing: PropTypes.bool,
	onAdd: PropTypes.func,
	onResize: PropTypes.func
}

Toolbar.defaultProps = {
	breadcrumbs: [
		{title: 'Fields', href: '/fields'},
		{title: 'Editor', href: '#'}
	]
}

export default Toolbar;