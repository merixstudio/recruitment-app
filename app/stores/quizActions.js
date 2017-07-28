import { action } from 'mobx';
import Question from './objects/Question';
import request from '../utils/request';
import { backendUrl } from '../config';

function getQuizId() {
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

export function saveQuestion(question) {
  question.isSaving = true;
  const quizId = getQuizId();

  return request.patch(`${backendUrl}/answer/${question.id}?quiz_id=${quizId}`, {
    answer: question.answer,
  })
  .then(() => question.afterSave());
}

export function saveQuestions() {
  const questions = this.questions.filter(question => !question.isSaved && question.isDirty);
  return Promise.all(
    questions.map((question) => {
      question.isSaving = true;
      return saveQuestion.call(this, question);
    }),
  );
}

export function submitQuiz() {
  if (this.isSubmitted) return;
  const id = location.pathname.slice(1);
  this.isSubmitting = true;

  saveQuestions.call(this)
  .then(() => request.put(`${backendUrl}/quiz/${id}`, {}))
  .then(action.bound(() => {
    this.isSubmitting = false;
    this.isSubmitted = true;
  }));
}

export function fetchQuiz() {
  if (!location.pathname) {
    this.hasFailedToLoad = true;
    return;
  }
  const id = location.pathname.slice(1);
  this.isFetching = true;

  request.get(`${backendUrl}/quiz/${id}`)
    .then(action.bound(onQuizFetch.bind(this)))
    .catch(action.bound(onQuizFetchError.bind(this)));
}
