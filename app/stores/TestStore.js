import { action, observable } from 'mobx';
import test from '../test';
import Question from './objects/Question';
import getQuery from '../utils/getQuery';

export default class Test {
  candidateId = null;
  @observable candidateName = null;
  @observable questions = [];
  @observable types = [];
  @observable isFetching = false;
  @observable hasFailedToLoad = false;
  @observable isSubmitting = false;
  @observable submitionDate = null;
  @observable isSubmitted = false;


  @action submitTest() {
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

  @action fetchTest() {
    if (!getQuery()) {
      this.hasFailedToLoad = true;
      return;
    }

    const id = getQuery().id;
    this.isFetching = true;
    setTimeout(
      action.bound(() => {
        this.name = test.name;
        this.questions = test.questions.map(question => new Question(this, question));
        this.types = test.types;
        this.isFetching = false;
      }),
      1000,
    );
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
