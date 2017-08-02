import { action, observable } from 'mobx';

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
    this.answer = answer;
    this.defaultAnswer = defaultAnswer;
    this.previousAnswer = answer;
    this.language = language;
    if (defaultAnswer !== answer) {
      this.isSaved = true;
    }
  }

  @action changeAnswer(newAnswer) {
    this.reset = false;
    this.answer = newAnswer;
    if (this.previousAnswer !== this.answer && this.answer !== this.defaultAnswer) {
      this.isDirty = true;
      this.isSaved = false;
    } else {
      this.isDirty = false;
      if (this.answer !== this.defaultAnswer) {
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
    this.store.saveQuestion(this).then(action.bound(() => {
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

  toJSON() {
    return {
      id: this.id,
      answer: this.answer,
      question: this.question,
    };
  }
}
