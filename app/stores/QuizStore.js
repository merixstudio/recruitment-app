import { action, observable } from 'mobx';

import Question from './objects/Question';
import request from '../utils/request';
import { backendUrl } from '../config';

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
    this.isSubmitting = true;
    const questions = this.questions.filter(question => !question.isSaved);
    questions.forEach((question) => {
      question.isSaving = true;
    });

    setTimeout(
      action.bound(() => {
        this.isSubmitting = false;
        this.isSubmitted = true;
        this.questions.forEach(question => question.afterSave());
      }),
      500,
    );
  }

  @action fetchQuiz() {
    if (!location.pathname) {
      this.hasFailedToLoad = true;
      return;
    }

    const id = location.pathname.slice(1);

    this.isFetching = true;
    request.get(`${backendUrl}/quiz/${id}`)
      .then(action.bound((quiz) => {
        this.applicant = quiz.applicant;
        this.questions = quiz.questions.map(question =>
          new Question(this, question, quiz.language));
        this.isFetching = false;
      }))
      .catch(action.bound(() => {
        this.isFetching = false;
        this.hasFailedToLoad = true;
      }));
  }

  @action saveQuestions() {
    const questions = this.questions.filter(question => !question.isSaved);
    questions.forEach((question) => {
      question.isSaving = true;
    });
    setTimeout(() => {
      questions.forEach(question => question.afterSave());
    }, 500);
  }

  saveQuestion(question) {
    setTimeout(() => question.afterSave(), 500);
  }
}
