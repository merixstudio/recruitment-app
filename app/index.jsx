import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { useStrict } from 'mobx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { amber500 } from 'material-ui/styles/colors';

import './styles/main.scss';
import App from './components/App';
import TestStore from './stores/TestStore';
import _UIStore from './stores/UIStore';

useStrict(true);
const root = document.querySelector('.application-root');
const testStore = new TestStore();
const UIStore = new _UIStore();
testStore.fetchTest();

window.addEventListener('keydown', (event) => {
  if (event.key === 's' && event.ctrlKey) event.preventDefault();
});

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: amber500,
  },
});

ReactDOM.render((
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider testStore={testStore} UIStore={UIStore}>
      <App />
    </Provider>
  </MuiThemeProvider>
), root);
