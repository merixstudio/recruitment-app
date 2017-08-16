module.exports = {
  sections: {
    firstQuestion: {
      selector: '//li[1]/*[contains(@class, \'question\')]',
      locateStrategy: 'xpath',
      elements: {
        reset: {
          selector: '.question__reset',
          locateStrategy: 'css selector',
        },
        indicator: {
          selector: '.question__indicator',
          locateStrategy: 'css selector',
        },
        editor: {
          selector: '.code-editor',
          locateStrategy: 'css selector',
        },
        firstLine: {
          selector: '.CodeMirror-line',
          locateStrategy: 'css selector',
        },
        resetInfo: {
          selector: '.question__reset-info',
          locateStrategy: 'css selector',
        },
        scroll: {
          selector: '.CodeMirror-overlayscroll-vertical',
          locateStrategy: 'css selector',
        },
      },
    },
    secondQuestion: {
      selector: '//li[2]/*[contains(@class, \'question\')]',
      locateStrategy: 'xpath',
      elements: {
        reset: {
          selector: '.question__reset',
          locateStrategy: 'css selector',
        },
        indicator: {
          selector: '.question__indicator',
          locateStrategy: 'css selector',
        },
        editor: {
          selector: '.code-editor',
          locateStrategy: 'css selector',
        },
        firstLine: {
          selector: '.CodeMirror-line',
          locateStrategy: 'css selector',
        },
        resetInfo: {
          selector: '.question__reset--info',
          locateStrategy: 'css selector',
        },
        scroll: {
          selector: '.CodeMirror-overlayscroll-vertical',
          locateStrategy: 'css selector',
        },
      },
    },
    root: {
      selector: 'body',
      elements: {
        name: {
          selector: '.lead__heading',
        },
        loading: {
          selector: '.app__loading',
        },
        error: {
          selector: '.app__error',
        },
        saveAll: {
          selector: '.app__container .app__button:nth-child(1)',
        },
        submit: {
          selector: '.app__container .app__button.app__button--primary',
        },
        question: {
          selector: '.question',
        },
        modal: {
          selector: '.modal',
        },
      },
    },
    modal: {
      selector: '.modal',
      elements: {
        cancel: {
          selector: '.modal__cancel',
        },
        confirm: {
          selector: '.modal__confirm',
        },
      },
    },
  },
};
