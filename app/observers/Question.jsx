import React from 'react';
import Card from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import { merix50 } from '../utils/variables';
import CodeEditor from '../components/CodeEditor';
import QuestionObservable from '../stores/objects/Question';

function saveBar(isSaved, isSaving) {
  if (isSaving) return (<Chip className="question__indicator question__indicator--saved" style={{ position: 'absolute' }}>saving...</Chip>);
  if (isSaved) {
    return (
      <Chip
        className="question__indicator question__indicator--saving"
        backgroundColor={merix50}
        labelColor="#ffffff"
        style={{ position: 'absolute' }}
      >Saved</Chip>
    );
  }
  return null;
}

function resetQuestion(question, submitted) {
  if (!submitted && !question.isDefault) {
    return (
      <button className="question__reset" onClick={() => question.resetToDefault()}>
        <span role="presentation" className="question__reset-info" onClick={event => event.preventDefault()}>
          It will reset answer to default.
        </span>
      </button>
    );
  }
  return null;
}

const Question = ({ number, question, submitted }) => (
  <Card className="question">
    <p className="question__text">
      <span className="question__number">{ number }. </span>
      { question.question }
    </p>
    <CodeEditor
      onSave={() => question.save()}
      onChange={newAnswer => question.changeAnswer(newAnswer)}
      language={question.language}
      answer={question.answer}
      readOnly={submitted}
      maxHeight={350}
      reset={question.reset}
    />
    { saveBar(question.isSaved, question.isSaving) }
    { resetQuestion(question, submitted) }
  </Card>
);

Question.propTypes = {
  number: PropTypes.number.isRequired,
  submitted: PropTypes.bool,
  question: PropTypes.instanceOf(QuestionObservable).isRequired,
};

Question.defaultProps = {
  submitted: false,
};

export default observer(Question);
