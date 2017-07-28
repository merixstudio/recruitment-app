import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { useStrict } from 'mobx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

import './styles/main.scss';
import { merix50 } from './utils/variables';
import App from './observers/App';
import QuizStore from './stores/QuizStore';
import _UIStore from './stores/UIStore';

useStrict(true);
injectTapEventPlugin();
const root = document.querySelector('.application-root');
const quizStore = new QuizStore();
const UIStore = new _UIStore();
quizStore.fetchQuiz();

window.addEventListener('keydown', (event) => {
  if (event.key === 's' && event.ctrlKey) event.preventDefault();
});

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: merix50,
  },
});

ReactDOM.render((
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider quizStore={quizStore} UIStore={UIStore}>
      <App />
    </Provider>
  </MuiThemeProvider>
), root);
