import React from 'react';
import { shallow } from 'enzyme';

import Header from 'app/components/Header';

describe('Header component', () => {
  it('should display correct title', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('h1').text()).toBe('Individual Recruitment Quiz');
  });
});
