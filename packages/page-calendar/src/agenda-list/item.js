import {createElement as h, PropTypes} from 'react'; /** @jsx h */
import RangeText from 'ubc-farm-page-planner/editor/range-text.js';

const AgendaItem = ({
	subject, description,
	start, end, notMyEvent,
	checked = false, onAction
}) => (
	<li className='event-item-container'>
		<div className='event-buttons'>
			<button className='event-button' 
				onClick={() => onAction('Edit')}
			>
				Edit
			</button>
			<button className='event-button' 
				onClick={() => onAction('Fill')}
			>
				Fill
			</button>
			<button className='event-button' 
				onClick={() => onAction('Add')}
			> 
				Add 
			</button>
			<button className='event-button' 
				onClick={() => onAction('Join')}
			>
				Join
			</button>
		</div>
		
		<article className='event-card'>
			<input type='checkbox' 
				checked={checked}
				onChange={() => onAction('Check')}
				className='event-card-check'
			/>
			<h4 className='event-title'>{subject}</h4>
			<p className='event-description'>{description}</p>
			
			<hr />
			
			<RangeText {...{start, end}} />
		</article>
	</li>
);

AgendaItem.propTypes = {
	subject: PropTypes.node,
	description: PropTypes.node,
	start: PropTypes.instanceOf(Date),
	end: PropTypes.instanceOf(Date),
	checked: PropTypes.bool,
	onAction: PropTypes.func
}

export default AgendaItem;