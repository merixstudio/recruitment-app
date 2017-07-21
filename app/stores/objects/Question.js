import { action, observable } from 'mobx';

export default class Question {
  @observable isSaved = false;
  @observable isSaving = false;
  @observable isDirty = false;
  @observable content = '';
  wasSaved = false;
  store = null;
  id = null;
  type = null;
  text = '';
  previousContent = '';

  constructor(store, { content, text, id, type }) {
    this.store = store;
    this.id = id;
    this.text = text;
    this.content = content;
    this.previousContent = content;
    this.type = type;
  }

  @action setDirty(newContent) {
    this.content = newContent;
    if (this.previousContent !== this.content) {
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
    this.previousContent = this.content;
  }

  @action save() {
    if (this.isDirty) {
      this.isSaving = true;
      this.store.saveQuestion(this);
    }
  }
}
