import { action } from 'mobx';
import Question from './objects/Question';
import request from '../utils/request';
import { backendUrl } from '../config';


export function getQuizId() {
  const pathname = location.pathname;
  if (!pathname) return '';
  return pathname[pathname.length - 1] === '/' ? pathname.slice(1, -1) : pathname.slice(1);
}

function onQuizFetch(quiz) {
  this.applicant = quiz.applicant;
  this.isSubmitted = quiz.is_finished;
  this.questions = quiz.questions.map(question =>
    new Question(this, question),
  );
  this.isFetching = false;
}

function onQuizFetchError() {
  this.isFetching = false;
  this.hasFailedToLoad = true;
}


const actions = {
  saveQuestion(question) {
    question.isSaving = true;
    const quizId = getQuizId();

    return request.patch(`${backendUrl}/answer/${question.id}?quiz_id=${quizId}`, {
      answer: question.answer,
    })
    .then(() => question.afterSave());
  },

  saveQuestions() {
    const questions = this.questions.filter(question => question.isDirty);

    return Promise.all(
      questions.map((question) => {
        question.isSaving = true;
        return this.saveQuestion(question);
      }),
    );
  },

  submitQuiz() {
    if (this.isSubmitted || !getQuizId()) return Promise.reject();
    this.isSubmitting = true;

    return this.saveQuestions()
    .then(() => request.put(`${backendUrl}/quiz/${getQuizId()}`, {}))
    .then(action.bound(() => {
      this.isSubmitting = false;
      this.isSubmitted = true;
    }));
  },

  fetchQuiz() {
    if (!getQuizId()) {
      this.hasFailedToLoad = true;
      return Promise.reject();
    }

    const id = getQuizId();
    this.isFetching = true;

    return request.get(`${backendUrl}/quiz/${id}`)
      .then(action.bound(onQuizFetch.bind(this)))
      .catch(action.bound(onQuizFetchError.bind(this)));
  },
};

export default actions;
