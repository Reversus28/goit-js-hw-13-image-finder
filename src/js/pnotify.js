import { error, defaults, Stack } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/Material.css';

defaults.styling = 'material';
defaults.icons = 'material';

const myStack = new Stack({
  dir1: 'down',
  dir2: 'left',
  firstpos1: 25,
  firstpos2: 25,
  spacing1: 36,
  spacing2: 36,
  push: 'bottom',
  context: document.body,
});

const notices = {
  errorEmptyInput() {
    error({
      title: 'Nothing found',
      text: 'Please enter a valid query',
      stack: myStack,
      delay: 1500,
      icon: false,
    });
  },
};

export default notices;
