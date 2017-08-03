import sinon from 'sinon';
import Question from 'app/stores/objects/Question';
import QuizStore from 'app/stores/QuizStore';

describe('Question observable', () => {
  let question;
  let saveQuestion;

  beforeEach(() => {
    const store = new QuizStore();
    saveQuestion = sinon.stub(store, 'saveQuestion').returns(Promise.resolve());
    question = new Question(store, {
      id: 0,
      language: 'javascript',
      answer: 'default answer',
      question: 'Default question.',
      default_answer: 'default answer',
    });
  });

  it('should not set dirty if answer does not change', () => {
    expect(question.isDirty).toBe(false);
    question.changeAnswer(question.answer);
    expect(question.isDirty).toBe(false);
    expect(question.isSaved).toBe(false);
  });

  it('should set saved if previous answer matches current and it\'s not a default answer', () => {
    question.defaultAnswer = '';
    question.changeAnswer(question.answer);
    expect(question.isSaved).toBe(true);
  });

  it('should set dirty if answer does changed', () => {
    expect(question.isDirty).toBe(false);
    question.changeAnswer(`${question.answer} addtitional answer`);
    expect(question.isDirty).toBe(true);
  });

  it('after save should set question in appropriate state', () => {
    question.afterSave();
    expect(question.isSaving).toBe(false);
    expect(question.isSaved).toBe(true);
    expect(question.isDirty).toBe(false);
    expect(question.previousAnswer).toBe(question.answer);
  });

  it('should delegate saving to the store only if dirty', () => {
    question.save();
    expect(saveQuestion.called).toBe(false);
    question.changeAnswer(`${question.answer} addtitional answer`);
    question.save();
    expect(saveQuestion.calledOnce).toBe(true);
  });

  it('should be able to reset question answer', () => {
    question.changeAnswer('Definitely new answer');
    question.resetToDefault().then(() => {
      expect(question.answer).toBe(question.defaultAnswer);
      expect(question.isDirty).toBe(false);
      expect(question.isSaved).toBe(false);
    });
  });
});
