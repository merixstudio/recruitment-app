import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { useStrict } from 'mobx';

import './styles/main.scss';
import App from './components/App';
import TestStore from './stores/Test';

useStrict(true);
const root = document.querySelector('.application-root');
const testStore = new TestStore();
testStore.fetchTest();

window.addEventListener('keydown', (event) => {
  if (event.key === 's' && event.ctrlKey) event.preventDefault();
});

ReactDOM.render((
  <Provider testStore={testStore}>
    <App />
  </Provider>
), root);
