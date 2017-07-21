import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

import TestStore from '../stores/Test';
import Question from './Question';
import Header from './Header';


function appContent(testStore) {
  if (testStore.isFetching) {
    return (<p className="app__is-fetching">Loading...</p>);
  }

  return [
    <Header key="header" candidateName={testStore.name} />,
    <ul key="list" className="app__question-list">
      { testStore.questions.map((question, idx) => (
        <li key={question.id} className="app__question-item">
          <Question number={idx + 1} question={question} submitted={testStore.isSubmitted} />
        </li>
      ))}
    </ul>,
    <a
      key="submit"
      className={`app__submit ${testStore.isSubmitted ? 'app__submit--disabled' : ''} `}
      onClick={() => testStore.submitTest()}
    >Submit</a>,
  ];
}

const App = ({ testStore }) => (
  <div className="app">
    { appContent(testStore) }
  </div>
);

App.propTypes = {
  testStore: PropTypes.instanceOf(TestStore).isRequired,
};

export default inject('testStore')(observer(App));
