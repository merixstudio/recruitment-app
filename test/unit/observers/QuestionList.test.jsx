import React from 'react';
import { shallow } from 'enzyme';

import QuestionList from 'app/observers/QuestionList';
import Question from 'app/observers/Question';
import QuestionModel from 'app/stores/objects/Question';
import QuizStore from 'app/stores/QuizStore';

describe('Question List observer', () => {
  let questions;
  let quizStore;

  beforeEach(() => {
    quizStore = new QuizStore();
    questions = [
      new QuestionModel(null, {
        id: 0,
        language: 'javascript',
        answer: 'default answer',
        question: 'Default question.',
        default_answer: 'default answer',
      }),
      new QuestionModel(null, {
        id: 1,
        language: 'javascript',
        answer: 'default answer',
        question: 'Default question.',
        default_answer: 'default answer',
      }),
    ];
  });

  it('should display one question observer for each question', () => {
    quizStore.questions = questions;
    const wrapper = shallow((
      <QuestionList />
    ), { context: { mobxStores: { quizStore } } }).dive();

    expect(wrapper.find(Question).length).toBe(2);
  });

  it('should react to changes to questions', () => {
    const wrapper = shallow((
      <QuestionList />
    ), { context: { mobxStores: { quizStore } } }).dive();

    expect(wrapper.find(Question).length).toBe(0);

    quizStore.questions = questions;

    expect(wrapper.find(Question).length).toBe(2);
  });
});
