import React from 'react';
import Card from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import { amber500 } from 'material-ui/styles/colors';

import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import CodeEditor from './CodeEditor';
import QuestionObservable from '../stores/objects/Question';

function saveBar(isSaved, isSaving) {
  if (isSaving) return (<Chip className="question__indicator question__indicator--saved" style={{ position: 'absolute' }}>saving...</Chip>);
  if (isSaved) {
    return (
      <Chip
        className="question__indicator question__indicator--saving"
        backgroundColor={amber500}
        labelColor="#ffffff"
        style={{ position: 'absolute' }}
      >Saved</Chip>
    );
  }
  return null;
}

const Question = observer(({ number, question, submitted }) => (
  <Card className="question">
    <p className="question__text">
      <span className="question__number">{ number }. </span>
      { question.text }
    </p>
    <CodeEditor
      onSave={() => question.save()}
      onChange={newContent => question.setDirty(newContent)}
      language={question.type}
      content={question.content}
      readOnly={submitted}
      maxHeight={350}
    />
    { saveBar(question.isSaved, question.isSaving) }
  </Card>
));

Question.propTypes = {
  number: PropTypes.number.isRequired,
  submitted: PropTypes.bool,
  question: PropTypes.instanceOf(QuestionObservable),
};

Question.defaultProps = {
  submitted: false,
};

export default Question;
