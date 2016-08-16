import {createElement as h} from 'react'; /** @jsx h */

const Loader = () => (
	<span className='loader'>
		Loading
		<span className='loader-dot ld-1' />
		<span className='loader-dot ld-2' />
		<span className='loader-dot ld-3' />
	</span>
);

export default Loader;