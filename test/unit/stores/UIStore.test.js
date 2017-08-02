import UIStore from 'app/stores/UIStore';

describe('UIStore', () => {
  let store;

  beforeEach(() => {
    store = new UIStore();
  });

  it('should change modal stage whe toggleModal is called', () => {
    expect(store.isModalOpen).toBe(false);
    store.toggleModal();
    expect(store.isModalOpen).toBe(true);
    store.toggleModal();
    expect(store.isModalOpen).toBe(false);
  });
});
