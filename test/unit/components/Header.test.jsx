import React from 'react';
import { shallow } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';

import AppBar from 'material-ui/AppBar';
import Header from 'app/components/Header';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

describe('Header component', () => {
  beforeEach(() => {
    jasmineEnzyme();
  });

  it('should display material-ui app bar', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find(AppBar).length).toBe(1);
  });

  it('should display correct page title in heading', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find(AppBar)).toHaveProp('title', 'Merix Recrutation Quiz');
  });
});
