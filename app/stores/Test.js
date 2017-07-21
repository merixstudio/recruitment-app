import { action, observable } from 'mobx';
import test from '../test';
import Question from './objects/Question';

export default class Test {
  @observable name = null;
  @observable questions = [];
  @observable types = [];
  @observable isFetching = false;
  @observable isSubmitting = false;
  @observable submitionDate = null;
  @observable isSubmitted = false;

  @action submitTest() {
    if (this.isSubmitted) return;
    this.isSubmitting = true;
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

  saveQuestion(question) {
    setTimeout(() => question.afterSave(), 500);
  }
}
