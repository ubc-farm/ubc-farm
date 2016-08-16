import {createElement as h, PropTypes} from 'react'; /** @jsx h */
import {classlist as cx} from '../../ubc-farm-utils/index.js';

const LoadingIndicator = props => (
	<div {...props}
		aria-role='progressbar' 
		className={cx('folding-cube', props.className)}
	>
		<div className='f-cube f-cube1' />
		<div className='f-cube f-cube2' />
		<div className='f-cube f-cube4' />
		<div className='f-cube f-cube3' />
	</div>
)

LoadingIndicator.propTypes = {
	className: PropTypes.string
}

export default LoadingIndicator;