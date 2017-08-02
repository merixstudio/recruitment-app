import React from 'react';
import { mount } from 'enzyme';

import QuestionCounter from 'app/components/QuestionCounter';

describe('Question Counter component', () => {
  it('should display the number of done questions and all questions', () => {
    const wrapper = mount(<QuestionCounter savedCount={3} allCount={5} />);
    expect(wrapper.getDOMNode().innerText).toMatch(/3([^a-zA-Z\d]?)5/);
  });

  it('should detect when all questions are done and change the className', () => {
    const wrapper = mount(<QuestionCounter savedCount={3} allCount={3} />);
    const classString = wrapper.getDOMNode().className;
    expect(classString).toMatch('--all');
  });
});
