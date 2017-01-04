import { configure } from '@kadira/storybook';

function loadStories() {
  require('./Agenda.jsx');
}

configure(loadStories, module);
