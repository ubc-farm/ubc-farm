import { configure } from '@kadira/storybook';

function loadStories() {
  require('./demo.js');
}

configure(loadStories, module);
