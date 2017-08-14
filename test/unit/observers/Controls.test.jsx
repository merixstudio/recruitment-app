import React from 'react';
import { mount } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import sinon from 'sinon';
import { Provider } from 'mobx-react';

import Controls from 'app/observers/Controls';
import UIStore from 'app/stores/UIStore';
import QuizStore from 'app/stores/QuizStore';

describe('Controls observer', () => {
  let uiStore;
  let quizStore;
  let modalSpy;
  let saveSpy;

  beforeEach(() => {
    jasmineEnzyme();
    uiStore = new UIStore();
    quizStore = new QuizStore();

    modalSpy = sinon.stub(uiStore, 'toggleModal');
    saveSpy = sinon.stub(quizStore, 'saveQuestions');
  });

  it('should save question when first button is clicked', () => {
    const wrapper = mount((
      <Provider UIStore={uiStore} quizStore={quizStore}>
        <Controls />
      </Provider>
    ));
    wrapper.find('.app__button').first().find('button').simulate('click');
    expect(saveSpy.calledOnce).toBe(true);
  });

  it('should open modal when second button is clicked', () => {
    const wrapper = mount((
      <Provider UIStore={uiStore} quizStore={quizStore}>
        <Controls />
      </Provider>
    ));
    wrapper.find('.app__button').last().find('button').simulate('click');
    expect(modalSpy.calledOnce).toBe(true);
  });

  it('should not display buttons if test is submitted', () => {
    quizStore.isSubmitted = true;
    const wrapper = mount((
      <Provider UIStore={uiStore} quizStore={quizStore}>
        <Controls />
      </Provider>
    ));
    expect(wrapper.find('.app__button').length).toBe(0);
  });
});
