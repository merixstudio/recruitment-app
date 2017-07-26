import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

import QuizStore from '../stores/QuizStore';
import QuestionList from './QuestionList';
import Controls from './Controls';
import Modal from './Modal';
import Header from './Header';


function appAnswer(quizStore) {
  if (quizStore.isFetching) {
    return (
      <div className="app__container">
        <p className="app__loading">Loading Questions...</p>
      </div>
    );
  }

  if (quizStore.hasFailedToLoad) {
    return (
      <div className="app__container">
        <p className="app__error">Quiz has failed to load</p>
      </div>
    );
  }

  const saved = quizStore.questions.filter(question => question.isSaved).length;
  const all = quizStore.questions.length;
  return (
    <div className="app__container app__container--relative">
      <p className="app__lead">Welcome, {quizStore.applicant}</p>
      <div className={`app__done ${saved === all ? 'app__done--all' : ''}`}>
        {saved}/{all}
      </div>
      <QuestionList />
      <Controls />
    </div>
  );
}

const App = ({ quizStore }) => (
  <div className="app">
    <Header />
    { appAnswer(quizStore) }
    <Modal />
  </div>
);

App.propTypes = {
  quizStore: PropTypes.instanceOf(QuizStore).isRequired,
};

export default inject('quizStore')(observer(App));
