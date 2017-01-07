import { createElement } from 'react'; /** @jsx createElement */
import { storiesOf, action } from '@kadira/storybook';
import App from '../src/graphs/demo.js';

storiesOf('Victory', module)
  .add('demo-all', () => (
    <App />
  ));
