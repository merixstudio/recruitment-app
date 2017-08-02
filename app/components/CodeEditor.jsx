import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/css/css';
import 'codemirror/mode/django/django';
import 'codemirror/mode/python/python';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/keymap/sublime';
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/scroll/simplescrollbars.css';

import CodeMirror from 'codemirror/lib/codemirror';
import React from 'react';
import PropTypes from 'prop-types';


function checkHeight(editor, height, maxHeight) {
  if (height > maxHeight) {
    editor.style.height = `${maxHeight}px`;
  } else {
    editor.style.height = 'auto';
  }
}

function getModeForLanguage(language) {
  switch (language) {
    case 'django-template': return 'django';
    case 'jsx': return 'jsx';
    case 'html': return 'htmlmixed';
    case 'javascript': return 'javascript';
    case 'python': return 'python';
    case 'css': return 'css';
    default: return 'text';
  }
}

export default class CodeEditor extends React.Component {
  componentDidMount() {
    const codeMirror = CodeMirror(this.editor, {
      tabSize: 2,
      theme: 'custom',
      keyMap: 'sublime',
      lineNumbers: true,
      scrollbarStyle: 'overlay',
      value: this.props.answer,
      readOnly: this.props.readOnly,
      mode: getModeForLanguage(this.props.language),
      extraKeys: {
        'Ctrl-S': () => this.props.onSave(),
      },
    });

    codeMirror.on('blur', () => this.props.onSave());

    codeMirror.on('change', (instance) => {
      if (this.props.maxHeight) {
        checkHeight(this.editor, instance.doc.height, this.props.maxHeight);
      }
      this.props.onChange(instance.getValue());
    });

    if (this.props.maxHeight) {
      checkHeight(this.editor, codeMirror.doc.height, this.props.maxHeight);
    }

    this.codeMirror = codeMirror;
  }

  componentWillUpdate(nextProps) {
    if (nextProps.readOnly !== this.props.readOnly) {
      this.codeMirror.setOption('readOnly', nextProps.readOnly);
    }
    if (nextProps.reset) {
      this.codeMirror.setValue(nextProps.answer);
    }
  }

  render() {
    return (
      <div
        ref={(el) => { this.editor = el; }}
        className={`code-editor ${this.props.readOnly ? 'code-editor--read-only' : ''}`}
      />
    );
  }
}

CodeEditor.propTypes = {
  readOnly: PropTypes.bool,
  answer: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  reset: PropTypes.bool,
  maxHeight: PropTypes.number,
  onSave: PropTypes.func,
  onChange: PropTypes.func,
};

CodeEditor.defaultProps = {
  reset: false,
  readOnly: false,
  maxHeight: null,
  onSave: () => {},
  onChange: () => {},
};
