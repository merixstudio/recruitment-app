import React from 'react';
import { shallow } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';

import Lead from 'app/components/Lead';

describe('Lead component', () => {
  it('should display applicant\'s name', () => {
    const wrapper = shallow(<Lead applicant="Mike" />);
    expect(wrapper.find('.lead__heading').text()).toMatch(/(^|\s)Mike(\s|$)/);
  });
});
