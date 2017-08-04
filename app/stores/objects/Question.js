import { action, observable, computed } from 'mobx';

export default class Question {
  @observable isSaved = false;
  @observable isSaving = false;
  @observable isDirty = false;
  @observable reset = false;
  @observable answer = '';
  store = null;
  id = null;
  type = null;
  question = '';
  previousAnswer = '';
  defaultAnswer = '';

  constructor(store, questionData) {
    const { answer, default_answer: defaultAnswer, question, id, language } = questionData;
    this.store = store;
    this.id = id;
    this.question = question;
    this.answer = answer.replace(/\r/g, '');
    this.defaultAnswer = defaultAnswer.replace(/\r/g, '');
    this.previousAnswer = answer.replace(/\r/g, '');
    this.language = language;
    if (!this.isDefault) {
      this.isSaved = true;
    }
  }

  @computed get isDefault() {
    return this.answer === this.defaultAnswer;
  }

  @computed get isPrevious() {
    return this.answer === this.previousAnswer;
  }

  @action changeAnswer(newAnswer) {
    this.reset = false;
    this.answer = newAnswer;
    if (!this.isPrevious && !this.isDefault) {
      this.isDirty = true;
      this.isSaved = false;
    } else {
      this.isDirty = false;
      if (!this.isDefault) {
        this.isSaved = true;
      } else {
        this.isSaved = false;
      }
    }
  }

  @action resetToDefault() {
    this.answer = this.defaultAnswer;
    this.previousAnswer = this.defaultAnswer;
    this.reset = true;
    return this.store.saveQuestion(this).then(action.bound(() => {
      this.isDirty = false;
      this.isSaved = false;
    }));
  }

  @action afterSave() {
    this.isSaving = false;
    this.isDirty = false;
    this.isSaved = true;
    this.previousAnswer = this.answer;
  }

  @action save() {
    if (this.isDirty) {
      this.store.saveQuestion(this);
    }
  }
}
