import { createElement } from 'react'; /** @jsx createElement */
import { storiesOf, action } from '@kadira/storybook';
import { Provider } from 'react-redux';
import Agenda from '../src/calendar/Agenda.jsx';
import store from './store.js';
import generateEvents from './generateEvents.js';

import '../www/agenda.css';

storiesOf('Button', module)
  .add('basic', () => (
    <Provider store={store}>
      <Agenda events={generateEvents()} />
    </Provider>
  ));
