import React from 'react';
import { mount } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import sinon from 'sinon';
import { Provider } from 'mobx-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Modal from 'app/observers/Modal';
import UIStore from 'app/stores/UIStore';
import QuizStore from 'app/stores/QuizStore';

describe('Modal observer', () => {
  let uiStore;
  let quizStore;
  let modalSpy;
  let submitSpy;

  beforeEach(() => {
    jasmineEnzyme();
    uiStore = new UIStore();
    quizStore = new QuizStore();

    modalSpy = sinon.stub(uiStore, 'toggleModal');
    submitSpy = sinon.stub(quizStore, 'submitQuiz');
  });

  it('should close modal when first button is clicked', () => {
    const wrapper = mount((
      <MuiThemeProvider>
        <Provider UIStore={uiStore} quizStore={quizStore}>
          <Modal />
        </Provider>
      </MuiThemeProvider>
    ));
    wrapper.find('button').first().simulate('click');
    expect(modalSpy.calledOnce).toBe(true);
  });

  it('should close modal when overlay is clicked', () => {
    const wrapper = mount((
      <MuiThemeProvider>
        <Provider UIStore={uiStore} quizStore={quizStore}>
          <Modal />
        </Provider>
      </MuiThemeProvider>
    ));
    wrapper.find('.modal').simulate('click');
    expect(modalSpy.calledOnce).toBe(true);
  });

  it('should submit quiz and close modal when second button in clicked', () => {
    const wrapper = mount((
      <MuiThemeProvider>
        <Provider UIStore={uiStore} quizStore={quizStore}>
          <Modal />
        </Provider>
      </MuiThemeProvider>
    ));
    wrapper.find('button').last().simulate('click');
    expect(submitSpy.calledOnce).toBe(true);
    expect(modalSpy.calledOnce).toBe(true);
  });

  it('should have additional class when modal closed', () => {
    uiStore.isModalOpen = true;
    const wrapper = mount((
      <MuiThemeProvider>
        <Provider UIStore={uiStore} quizStore={quizStore}>
          <Modal />
        </Provider>
      </MuiThemeProvider>
    ));
    expect(wrapper.find('.modal').hasClass('modal--hidden')).toBe(false);

    uiStore.isModalOpen = false;
    expect(wrapper.find('.modal').hasClass('modal--hidden')).toBe(true);
  });
});
