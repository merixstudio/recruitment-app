import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

import QuizStore from '../stores/QuizStore';
import QuestionList from '../observers/QuestionList';
import Controls from '../observers/Controls';
import Modal from '../observers/Modal';
import QuestionCounter from '../components/QuestionCounter';
import Header from '../components/Header';
import Lead from '../components/Lead';

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
      <Lead applicant={quizStore.applicant} />
      <QuestionCounter savedCount={saved} allCount={all} />
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
