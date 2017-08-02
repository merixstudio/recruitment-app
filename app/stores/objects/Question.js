import { action, observable } from 'mobx';

export default class Question {
  @observable isSaved = false;
  @observable isSaving = false;
  @observable isDirty = false;
  @observable answer = '';
  store = null;
  id = null;
  type = null;
  question = '';
  previousAnswer = '';

  constructor(store, questionData) {
    const { answer, default_answer: defaultAnswer, question, id, language } = questionData;
    this.store = store;
    this.id = id;
    this.question = question;
    this.answer = answer;
    this.defaultAnswer = defaultAnswer;
    this.previousAnswer = answer;
    this.language = language;
    if (defaultAnswer !== answer) {
      this.isSaved = true;
    }
  }

  @action changeAnswer(newAnswer) {
    this.answer = newAnswer;
    if (this.previousAnswer !== this.answer) {
      this.isDirty = true;
      this.isSaved = false;
    } else {
      this.isDirty = false;
      if (this.answer !== this.defaultAnswer) {
        this.isSaved = true;
      }
    }
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

  toJSON() {
    return {
      id: this.id,
      answer: this.answer,
      question: this.question,
    };
  }
}
