import React from 'react';
import { mount } from 'enzyme';
import CodeMirror from 'codemirror';
import CodeEditor, { _checkHeight, _getModeForLanguage } from 'app/components/CodeEditor';

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
  it('should change Code Mirror readOnly option when props change', () => {
    const wrapper = mount(<CodeEditor answer="" language="english" />);
    const nestedEditor = wrapper.node.codeMirror;
    wrapper.setProps({ readOnly: true });
    expect(nestedEditor.getOption('readOnly')).toBe(true);
  });

  it('should update Code Mirror content when reset is set to true', () => {
    const wrapper = mount(<CodeEditor answer="some content" language="english" />);
    const nestedEditor = wrapper.node.codeMirror;
    wrapper.setProps({ answer: 'different content' });
    expect(nestedEditor.getValue()).toBe('some content');
    wrapper.setProps({ answer: 'yet another content', reset: true });
    expect(nestedEditor.getValue()).toBe('yet another content');
  });

  it('should set style.height to maxHeight if maxHeight is exceeded', () => {
    const el = { style: {} };
    _checkHeight(el, 200, 300);
    expect(el.style.height).toBe('auto');
    _checkHeight(el, 400, 300);
    expect(el.style.height).toBe('300px');
  });

  it('should translate language to correct mode', () => {
    expect(_getModeForLanguage('english')).toBe('text');
    expect(_getModeForLanguage('javascript')).toBe('javascript');
    expect(_getModeForLanguage('django-template')).toBe('django');
    expect(_getModeForLanguage('html')).toBe('htmlmixed');
    expect(_getModeForLanguage('jsx')).toBe('jsx');
    expect(_getModeForLanguage('python')).toBe('python');
    expect(_getModeForLanguage('css')).toBe('css');
  });
});
