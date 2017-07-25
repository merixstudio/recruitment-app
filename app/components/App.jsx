import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

import TestStore from '../stores/TestStore';
import QuestionList from './QuestionList';
import Controls from './Controls';
import Modal from './Modal';
import Header from './Header';


function appContent(testStore) {
  if (testStore.isFetching) {
    return (
      <div className="app__container">
        <p className="app__loading">Loading Questions...</p>
      </div>
    );
  }

  if (testStore.hasFailedToLoad) {
    return (
      <div className="app__container">
        <p className="app__error">Test has failed to load</p>
      </div>
    );
  }

  const saved = testStore.questions.filter(question => question.isSaved).length;
  const all = testStore.questions.length;
  return (
    <div className="app__container app__container--relative">
      <p className="app__lead">Welcome, {testStore.name}</p>
      <div className={`app__done ${saved === all ? 'app__done--all' : ''}`}>
        {saved}/{all}
      </div>
      <QuestionList />
      <Controls />
    </div>
  );
}

const App = ({ testStore }) => (
  <div className="app">
    <Header />
    { appContent(testStore) }
    <Modal />
  </div>
);

App.propTypes = {
  testStore: PropTypes.instanceOf(TestStore).isRequired,
};

export default inject('testStore')(observer(App));
