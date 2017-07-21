import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import CodeEditor from './CodeEditor';
import QuestionObservable from '../stores/objects/Question';

function saveBar(isSaved, isSaving) {
  if (isSaved) return (<div className="question__indicator question__indicator--saved">Saved</div>);
  if (isSaving) return (<div className="question__indicator question__indicator--saving">saving...</div>);
  return null;
}

const Question = observer(({ number, question, submitted }) => (
  <div className="question">
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
  </div>
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
