import { action, observable } from 'mobx';

export default class Question {
  @observable isSaved = false;
  @observable isSaving = false;
  @observable isDirty = false;
  @observable answer = '';
  wasSaved = false;
  store = null;
  id = null;
  type = null;
  question = '';
  previousAnswer = '';

  constructor(store, { answer, default_answer, question, id }, type) {
    this.store = store;
    this.id = id;
    this.question = question;
    this.answer = answer;
    this.defaultAnswer = default_answer;
    this.previousAnswer = answer;
    this.type = type;
    if (default_answer !== answer) {
      this.isSaved = true;
    }
  }

  @action setDirty(newAnswer) {
    this.answer = newAnswer;
    if (this.previousAnswer !== this.answer) {
      this.isDirty = true;
      this.isSaved = false;
    } else {
      this.isDirty = false;
      if (this.wasSaved) {
        this.isSaved = true;
      }
    }
  }

  @action afterSave() {
    this.isSaving = false;
    this.isDirty = false;
    this.isSaved = true;
    this.wasSaved = true;
    this.previousAnswer = this.answer;
  }

  @action save() {
    if (this.isDirty) {
      this.isSaving = true;
      this.store.saveQuestion(this);
    }
  }
}
