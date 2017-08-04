import fetchMock from 'fetch-mock';
import sinon from 'sinon';
import quizActions, { getQuizId } from 'app/stores/quizActions';
import QuizStore from 'app/stores/QuizStore';
import Question from 'app/stores/objects/Question';


const quizData = {
  applicant: 'Mike',
  is_finished: false,
  questions: [
    {
      id: 1,
      language: 'javascript',
      answer: '(function (dependency) {})(dependency)',
      default_answer: '(function (dependency) {})(dependency)',
      question: 'Write your own JavaScript framework in 3 lines.',
    },
    {
      id: 2,
      language: 'html',
      answer: '<div className="what__ever"></div>',
      default_answer: '<div className="what__ever"></div>',
      question: 'Pellentesque habitant morbi tristique senectus.',
    },
  ],
};

describe('QuizStore', () => {
  let store;
  let questions = [];
  let pathname = '';

  quizActions.__Rewire__('getQuizId', () => pathname);
  QuizStore.__Rewire__('actions', quizActions);

  beforeEach(() => {
    store = new QuizStore();
    questions = quizData.questions.map(questionData => new Question(store, questionData));
  });

  it('should contain list of questions', () => {
    expect(store.questions).toBeDefined();
  });

  it('should fetch questions', (done) => {
    pathname = 'someID';
    fetchMock.getOnce('end:quiz/someID', { ...quizData });
    store.fetchQuiz().then(() => {
      expect(store.applicant).toBe('Mike');
      expect(store.questions.length).toBe(2);
      done();
    });
  });

  it('should be able to save a question', (done) => {
    pathname = 'someID';
    const afterSaveSpy = sinon.spy(questions[0], 'afterSave');

    fetchMock.patchOnce(`end:/answer/${questions[0].id}?quiz_id=someID`, {}, { name: 'patched' });
    store.questions = questions;

    store.saveQuestion(questions[0]).then(() => {
      expect(questions[0].isSaving).toBe(false);
      expect(afterSaveSpy.calledOnce).toBe(true);
      expect(fetchMock.called('patched')).toBe(true);
      done();
    });
    expect(questions[0].isSaving).toBe(true);
  });

  it('saveQuestions should save all dirty questions', (done) => {
    const saveQuestionSpy = sinon.stub(store, 'saveQuestion').returns(Promise.resolve());
    store.questions = questions;
    store.saveQuestions();
    expect(saveQuestionSpy.callCount).toBe(0);

    questions[0].changeAnswer('Different answer');
    store.saveQuestions().then(() => {
      expect(saveQuestionSpy.callCount).toBe(1);
      done();
    });
  });

  it('submitQuiz should patch quiz and save all questions', (done) => {
    pathname = 'someID';
    const saveQuestionsSpy = sinon.stub(store, 'saveQuestions').returns(Promise.resolve());
    fetchMock.putOnce('end:quiz/someID', {}, { name: 'putQuiz' });
    store.submitQuiz().then(() => {
      expect(store.isSubmitted).toBe(true);
      expect(fetchMock.called('putQuiz')).toBe(true);
      expect(saveQuestionsSpy.calledOnce).toBe(true);
      done();
    });
  });

  it('should not fetch quiz if no id in pathname', (done) => {
    pathname = '';
    fetchMock.getOnce('end:quiz/someID', { ...quizData }, { name: 'fetchQuiz' });
    store.fetchQuiz().catch(() => {
      expect(fetchMock.called('fetchQuiz')).toBe(false);
      expect(store.hasFailedToLoad).toBe(true);
      done();
    });
  });

  it('should not submit quiz if it is already submitted', (done) => {
    pathname = 'someID';
    store.isSubmitted = true;
    const saveQuestionsSpy = sinon.stub(store, 'saveQuestions').returns(Promise.resolve());

    fetchMock.putOnce('end:quiz/someID', {}, { name: 'putQuiz' });
    store.submitQuiz().catch(() => {
      expect(store.isSubmitted).toBe(true);
      expect(fetchMock.called('putQuiz')).toBe(false);
      expect(saveQuestionsSpy.called).toBe(false);
      done();
    });
  });

  it('should react to quiz not being found on server', (done) => {
    pathname = 'wrongId';
    fetchMock.getOnce('end:quiz/wrongId', { status: 404, body: {} }, { name: 'fetchQuiz404' });
    store.fetchQuiz().then(() => {
      expect(fetchMock.called('fetchQuiz404')).toBe(true);
      expect(store.hasFailedToLoad).toBe(true);
      done();
    });
  });

  it('should correctly get id from pathname', () => {
    quizActions.__Rewire__('location', { pathname: '/something' });
    expect(getQuizId()).toBe('something');
    quizActions.__Rewire__('location', { pathname: '' });
    expect(getQuizId()).toBe('');
    quizActions.__Rewire__('location', { pathname: '/url/' });
    expect(getQuizId()).toBe('url');

  });
  afterEach(() => fetchMock.restore());
});
