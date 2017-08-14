import React from 'react';
import { mount } from 'enzyme';
import CodeMirror from 'codemirror';
import CodeEditor, { checkHeight, getModeForLanguage } from 'app/components/CodeEditor';

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
    checkHeight(el, 200, 300);
    expect(el.style.height).toBe('auto');
    checkHeight(el, 400, 300);
    expect(el.style.height).toBe('300px');
  });

  it('should translate language to correct mode', () => {
    expect(getModeForLanguage('english')).toBe('text');
    expect(getModeForLanguage('javascript')).toBe('javascript');
    expect(getModeForLanguage('django-template')).toBe('django');
    expect(getModeForLanguage('html')).toBe('htmlmixed');
    expect(getModeForLanguage('jsx')).toBe('jsx');
    expect(getModeForLanguage('python')).toBe('python');
    expect(getModeForLanguage('css')).toBe('css');
  });

  it('should call onSave prop on blur', () => {
    let save = false;
    const onSave = () => { save = true; };
    const wrapper = mount(<CodeEditor answer="some content" language="english" onSave={onSave} />);
    const cm = wrapper.node.codeMirror;
    expect(cm._handlers.blur).toBeTruthy();
    cm._handlers.blur.forEach(handler => handler.call(null, cm));
    expect(save).toBe(true);
  });

  it('should save on Ctrl+S', () => {
    let save = false;
    const onSave = () => { save = true; };
    const wrapper = mount(<CodeEditor answer="some content" language="english" onSave={onSave} />);
    const cm = wrapper.node.codeMirror;

    expect(cm.options.extraKeys['Ctrl-S'] instanceof Function).toBe(true);
    cm.options.extraKeys['Ctrl-S'](cm);
    expect(save).toBe(true);
  });

  it('should check height when component is mounted', () => {
    const wrapper = mount(<CodeEditor answer="some content" language="english" maxHeight={200} />);
    expect(wrapper.node.editor.style.height).toBe('auto');
  });

  it('should check height on change', () => {
    const wrapper = mount(<CodeEditor answer="some content" language="english" maxHeight={200} />);
    const cm = wrapper.node.codeMirror;
    expect(cm._handlers.change instanceof Array).toBe(true);
    cm.doc.height = 500;
    cm._handlers.change.forEach(handler => handler.call(null, cm));
    expect(wrapper.node.editor.style.height).toBe('200px');
  });

  it('should call on change handler if provided', () => {
    let change = false;
    const onChange = () => { change = true; };
    const wrapper = mount(<CodeEditor answer="some content" language="english" onChange={onChange} />);
    const cm = wrapper.node.codeMirror;
    expect(cm._handlers.change instanceof Array).toBe(true);
    cm._handlers.change.forEach(handler => handler.call(null, cm));
    expect(change).toBe(true);
  });
});
