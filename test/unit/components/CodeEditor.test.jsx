import React from 'react';
import { mount } from 'enzyme';

import CodeMirror from 'codemirror';
import CodeEditor from 'app/components/CodeEditor';

describe('Code Editor component', () => {
  it('should wrap Code Mirror editor', () => {
    const wrapper = mount(<CodeEditor answer="" language="english" />);
    const DOMElementRef = wrapper.getDOMNode();
    expect(DOMElementRef.getElementsByClassName('CodeMirror').length).toBe(1);
  });

  it('should hold reference to Code Mirror editor', () => {
    const wrapper = mount(<CodeEditor answer="" language="english" />);
    const nestedEditor = wrapper.node.codeMirror;
    expect(nestedEditor instanceof CodeMirror).toBe(true);
  });

  it('should assure that Code Mirror is not editable if editor is read only', () => {
    const wrapper = mount(<CodeEditor answer="" language="english" readOnly />);
    const nestedEditor = wrapper.node.codeMirror;
    expect(nestedEditor.getOption('readOnly')).toBe(true);
  });
});
