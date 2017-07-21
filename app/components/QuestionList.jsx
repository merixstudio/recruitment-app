import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

import Question from './Question';
import TestStore from '../stores/TestStore';

const QuestionList = ({ testStore }) => (
  <ul key="list" className="app__question-list">
    { testStore.questions.map((question, idx) => (
      <li key={question.id} className="app__question-item">
        <Question number={idx + 1} question={question} submitted={testStore.isSubmitted} />
      </li>
    ))}
  </ul>
);

QuestionList.propTypes = {
  testStore: PropTypes.instanceOf(TestStore).isRequired,
};

export default inject('testStore')(observer(QuestionList));
