import { action, observable } from 'mobx';

import Question from './objects/Question';
import request from '../utils/request';
import { backendUrl } from '../config';

function getQuizId() {
  const pathname = location.pathname;
  if (!pathname) return '';
  return pathname[pathname.length - 1] === '/' ? pathname.slice(1, -1) : pathname.slice(1);
}

function onQuizFetch(store, quiz) {
  store.applicant = quiz.applicant;
  store.isSubmitted = quiz.is_finished;
  store.questions = quiz.questions.map(question =>
    new Question(store, question, quiz.is_finished),
  );
  store.isFetching = false;
}

function onQuizFetchError(store) {
  store.isFetching = false;
  store.hasFailedToLoad = true;
}

export default class Quiz {
  candidateId = null;
  @observable applicant = null;
  @observable questions = [];
  @observable isFetching = false;
  @observable hasFailedToLoad = false;
  @observable isSubmitting = false;
  @observable submitionDate = null;
  @observable isSubmitted = false;


  @action submitQuiz() {
    if (this.isSubmitted) return;
    const id = location.pathname.slice(1);
    this.isSubmitting = true;

    this.saveQuestions()
    .then(() => request.put(`${backendUrl}/quiz/${id}`, {}))
    .then(action.bound(() => {
      this.isSubmitting = false;
      this.isSubmitted = true;
    }));
  }

  @action fetchQuiz() {
    if (!location.pathname) {
      this.hasFailedToLoad = true;
      return;
    }
    const id = location.pathname.slice(1);
    this.isFetching = true;

    request.get(`${backendUrl}/quiz/${id}`)
      .then(action.bound(onQuizFetch.bind(null, this)))
      .catch(action.bound(onQuizFetchError.bind(null, this)));
  }

  @action saveQuestions() {
    const questions = this.questions.filter(question => !question.isSaved);
    return Promise.all(
      questions.map((question) => {
        question.isSaving = true;
        return this.saveQuestion(question);
      }),
    );
  }

  saveQuestion(question) {
    const quizId = getQuizId();

    return request.patch(`${backendUrl}/answer/${question.id}?quiz_id=${quizId}`, {
      answer: question.answer,
    })
    .then(() => question.afterSave());
  }
}
