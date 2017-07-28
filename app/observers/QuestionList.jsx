import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

import Question from '../observers/Question';
import QuizStore from '../stores/QuizStore';

const QuestionList = ({ quizStore }) => (
  <ul key="list" className="app__question-list">
    { quizStore.questions.map((question, idx) => (
      <li key={question.id} className="app__question-item">
        <Question number={idx + 1} question={question} submitted={quizStore.isSubmitted} />
      </li>
    ))}
  </ul>
);

QuestionList.propTypes = {
  quizStore: PropTypes.instanceOf(QuizStore).isRequired,
};

export default inject('quizStore')(observer(QuestionList));
