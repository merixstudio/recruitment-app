import React from 'react';
import { shallow } from 'enzyme';

import QuizStore from 'app/stores/QuizStore';
import QuestionList from 'app/observers/QuestionList';
import App from 'app/observers/App';

describe('App component', () => {
  let quizStore;

  beforeEach(() => {
    quizStore = new QuizStore();
  });

  it('should display loading information when quiz is fetching', () => {
    const wrapper = shallow(<App />, { context: { mobxStores: { quizStore } } }).dive();
    quizStore.isFetching = true;
    expect(wrapper.find('.app__loading').length).toBe(1);
  });

  it('should inform about failure when loading the quiz fails', () => {
    const wrapper = shallow(<App />, { context: { mobxStores: { quizStore } } }).dive();
    quizStore.hasFailedToLoad = true;
    expect(wrapper.find('.app__error').length).toBe(1);
  });

  it('should show list of questions when fetched properly', () => {
    const questions = [
      { id: 1, questions: 'Question 1', language: 'english', answer: '', defaultAnswer: '' },
      { id: 2, questions: 'Question 2', language: 'english', answer: '', defaultAnswer: '' },
      { id: 3, questions: 'Question 3', language: 'english', answer: '', defaultAnswer: '' },
    ];
    quizStore.questions = questions;
    const wrapper = shallow(<App />, { context: { mobxStores: { quizStore } } }).dive();
    const questionList = wrapper.find(QuestionList);
    expect(questionList.length).toBe(1);
    // expect(questionList.props.questions).toBe(questions);
  });
});
