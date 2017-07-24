import { observable, action } from 'mobx';

export default class UIStore {
  @observable isModalOpen = false;
  @action toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }
}
